'use strict';

module.exports = (nodecg, backendEvents) => {
	const PouchDB = require('pouchdb');
	const shortid = require('shortid');

	PouchDB.plugin(require('pouchdb-find'));
	PouchDB.plugin(require('pouchdb-live-find'));

	const db = new PouchDB('pouchdb/smashdb');

	const playerDB = nodecg.Replicant('playerDB');
	const tournamentDB = nodecg.Replicant('tournamentDB');
	const setDB = nodecg.Replicant('setDB');

	const playerQuery = db.liveFind({
		selector: {_id: {$regex: /^player/}},
		aggregate: true
	});
	const tournamentQuery = db.liveFind({
		selector: {_id: {$regex: /^tournament/}},
		aggregate: true
	});
	const setQuery = db.liveFind({
		selector: {_id: {$regex: /^set/}},
		aggregate: true
	});

	/*
	  DB Interactions
	*/
	const addDB = (data, id, cb) => {
		db.put(Object.assign(data.doc, {
			_id: `${data.type}_${data.id}_${shortid.generate()}`
		}))
			.then(resp => {
				cb(null, resp);
			})
			.catch(err => {
				cb(err);
			});
	};

	const delDB = (data, cb) => {
		db.remove(data)
			.then(resp => {
				cb(null, resp);
			})
			.catch(err => {
				cb(err);
			});
	};

	/*
      PouchDB Listeners
    */
	playerQuery.on('ready', () => {
		console.log('playerQuery ready');
	});
	tournamentQuery.on('ready', () => {
		console.log('tournamentQuery ready');
	});
	setQuery.on('ready', () => {
		console.log('setQuery ready');
	});

	playerQuery.on('update', (update, aggregate) => {
		playerDB.value = aggregate;
	});
	tournamentQuery.on('update', (update, aggregate) => {
		tournamentDB.value = aggregate;
	});
	setQuery.on('update', (update, aggregate) => {
		setDB.value = aggregate;
	});

	/*
      NodeCG Listeners
    */
	nodecg.listenFor('db:addDoc', addDB);

	nodecg.listenFor('db:setDoc', (data, cb) => {
		console.log(data);
		db.put(data)
			.then(resp => {
				cb(null, resp);
			})
			.catch(err => {
				cb(err);
			});
	});

	nodecg.listenFor('db:delDoc', delDB);

	nodecg.listenFor('db:addPlayersFromTournament', (id, cb) => {
		db.get(id)
			.then(doc => doc.players.map(player => {
				const result = playerDB.value.filter(oldPlayer => {
					return oldPlayer._id.includes(player.id);
				});

				if (result.length) {
					return Object.assign(result[0], player);
				}

				delete player._events;
				delete player._eventsCount;

				return Object.assign(player, {
					_id: `player_${player.id}_${shortid.generate()}`
				});
			}))
			.then(newPlayers => db.bulkDocs(newPlayers))
			.then(() => {
				cb(null, true);
			})
			.catch(e => cb(e));
	});

	/*
	  NodeCG Extension Listeners
	*/

	backendEvents.on('db:addDoc', addDB);
	backendEvents.on('db:delDoc', delDB);
};
