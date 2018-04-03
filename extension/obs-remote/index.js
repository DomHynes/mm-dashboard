'use strict';

module.exports = (nodecg, backendEvents) => {
	if (!nodecg.bundleConfig.obs || !nodecg.bundleConfig.obs.enabled) {
		return;
	}
	const OBSWebSocket = require('obs-websocket-js');
	const obs = new OBSWebSocket();

	require('./listeners')(nodecg, backendEvents, obs);

	obs.connect({
		address: 'localhost:4444'
	});
};
