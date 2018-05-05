'use strict';

module.exports = (nodecg, backendEvents) => {
	if (!nodecg.bundleConfig.twitch || !nodecg.bundleConfig.twitch.enabled) {
		return;
	}

	require('./auth')(nodecg, backendEvents);
	require('./twitch')(nodecg, backendEvents);
};
