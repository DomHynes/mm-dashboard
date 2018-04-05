'use strict';

const {colorScenes} = require('./utils');

module.exports = (nodecg, backendEvents, pad) => {
	const obsData = nodecg.Replicant('obs-data');

	obsData.on('change', newData => {
		colorScenes(pad, newData);
	});

	nodecg.listenFor('launchpad:connect', () => {
		console.log('connecting');
		pad.connect();
	});
	nodecg.listenFor('launchpad:check', () => {
		console.log(pad);
	});
};

