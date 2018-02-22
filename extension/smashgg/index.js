'use strict';

module.exports = (nodecg, backendEvents) => {
	const smashgg = require('smashgg.js');
	const tournament = nodecg.Replicant('currentTournament');

	nodecg.listenFor('smashgg:addTournament', (slug, cb) => {
		const newTournament = new smashgg.Tournament(slug);

		newTournament.on('error', err => {
			console.error('Error in smashgg: ' + err);
			cb(err);
		});

		newTournament.on('ready', async () => {
			const players = await newTournament.getAllPlayers();
			const events = await newTournament.getAllEvents();
			const data = newTournament.data;

			const tournamentData = {
				doc: {
					players, events, data
				},
				id: data.entities.tournament.id,
				type: 'tournament'
			};

			backendEvents.emit('db:addDoc', tournamentData, cb);
		});
	});

	nodecg.listenFor('smashgg:checkTournament', (slug, cb) => {
		const newTournament = new smashgg.Tournament(slug);

		newTournament.on('error', err => {
			console.error('Error in smashgg: ' + err);
			cb(err);
		});

		newTournament.on('ready', async () => {
			cb(null, {
				name: newTournament.getName(),
				id: newTournament.getId(),
				slug: newTournament.data.entities.tournament.shortSlug
			});
		});
	});

	nodecg.listenFor('smashgg:delTournament', (tournamentData, cb) => {
		backendEvents.emit('db:delDoc', tournamentData, cb);
	});
};
