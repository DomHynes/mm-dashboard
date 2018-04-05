'use strict';

const OBSWebSocket = require('obs-websocket-js');

module.exports = (nodecg, backendEvents) => {
	if (!nodecg.bundleConfig.obs || !nodecg.bundleConfig.obs.enabled) {
		return;
	}
	const obs = new OBSWebSocket();

	require('./listeners')(nodecg, backendEvents, obs);

	obs.connect({
		address: 'localhost:4444'
	});
};
