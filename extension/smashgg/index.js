'use strict';

const nodecg = require('../util/nodecg-api-context').get();
const smashgg = require('smashgg.js');

const tournament = nodecg.Replicant('currentTournament');

nodecg.listenFor('smashgg:getTournament', (slug, cb) => {
	const newTournament = new smashgg.Tournament(slug);

	newTournament.on('error', err => {
		console.error('Error in smashgg: ' + err);
	});

	newTournament.on('ready', async () => {
		const players = await newTournament.getAllPlayers();
		const events = await newTournament.getAllEvents();
		const data = newTournament.data;
		tournament.value = {
			players, events, data
		};
		cb(null);
	});
});
