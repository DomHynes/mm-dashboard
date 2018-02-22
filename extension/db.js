'use strict';

module.exports = (nodecg, backendEvents) => {
	const PouchDB = require('pouchdb');
	const shortid = require('shortid');
	const ajv = require('ajv');

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
		console.log(aggregate);
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

	/*
	  NodeCG Extension Listeners
	*/

	backendEvents.on('db:addDoc', addDB);
	backendEvents.on('db:delDoc', delDB);
};
