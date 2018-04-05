'use strict';
const {handleKey} = require('./utils');

module.exports = (nodecg, backendEvents, pad) => {
	pad.once('connect', () => {
		console.log('launchpad connected');

		pad.on('disconnect', () => {
			console.log('launchpad disconnected');
		});

		pad.on('key', async key => {
			await handleKey(key, nodecg, backendEvents);
		});
	});
};

