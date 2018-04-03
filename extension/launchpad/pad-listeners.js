'use strict';
const {setupPad} = require('./utils');

module.exports = (nodecg, backendEvents, pad) => {
	pad.once('connect', () => {
		console.log('launchpad connected');
		setupPad(pad);

		pad.on('disconnect', () => {
			console.log('launchpad disconnected');
		});

		pad.on('key', k => {
			pad.col(k.pressed ? pad.red : pad.green, k);
		});
	});
};

