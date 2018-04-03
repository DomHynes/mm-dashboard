'use strict';
const EventEmitter = require('events');
const backendEvents = new EventEmitter();

module.exports = nodecg => {
	require('./game-data')(nodecg, backendEvents);
	require('./obs-remote')(nodecg, backendEvents);
	require('./smashgg')(nodecg, backendEvents);
	require('./db')(nodecg, backendEvents);
	require('./fs')(nodecg, backendEvents);
	require('./twitch')(nodecg, backendEvents);
	require('./twitter')(nodecg, backendEvents);
	require('./youtube')(nodecg, backendEvents);
	require('./launchpad')(nodecg, backendEvents);
};

