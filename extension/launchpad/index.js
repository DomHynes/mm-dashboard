'use strict';

const Launchpad = require('launchpad-mini');

module.exports = (nodecg, backendEvents) => {
	if (!nodecg.bundleConfig.launchpad || !nodecg.bundleConfig.launchpad.enabled) {
		return;
	}
	const pad = new Launchpad();
	console.log(pad);

	require('./pad-listeners')(nodecg, backendEvents, pad);
	require('./ext-listeners')(nodecg, backendEvents, pad);
	pad.connect();
};

