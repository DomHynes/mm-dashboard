'use strict';

const {colorScenes} = require('./utils');

module.exports = (nodecg, backendEvents, pad) => {
	const obsData = nodecg.Replicant('obs-data');
	const setInfo = nodecg.Replicant('set-info');

	const updatePad = () => {
		colorScenes(pad, obsData.value, setInfo.value);
	};

	obsData.on('change', () => {
		updatePad();
	});
	setInfo.on('change', () => {
		updatePad();
	});

	nodecg.listenFor('launchpad:connect', () => {
		console.log('connecting');
		pad.connect();
	});
	nodecg.listenFor('launchpad:check', () => {
		console.log(pad);
	});
};

