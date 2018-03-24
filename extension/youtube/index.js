'use strict';

module.exports = (nodecg, backendEvents) => {
	if (!nodecg.bundleConfig.youtube || !nodecg.bundleConfig.youtube.enabled) {
		return;
	}

	require('./auth')(nodecg, backendEvents);
	require('./youtube')(nodecg, backendEvents);
};
