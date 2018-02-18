'use strict';
const EventEmitter = require('events');

const backendEvents = new EventEmitter();

module.exports = nodecg => {
	require('./character-data')(nodecg, backendEvents);
	require('./remote-obs')(nodecg, backendEvents);
	require('./smashgg')(nodecg, backendEvents);
	require('./db')(nodecg, backendEvents);
	// require('./twitter');
};

