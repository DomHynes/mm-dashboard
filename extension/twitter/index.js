'use strict';

module.exports = (nodecg, backendEvents) => {
	if (!nodecg.bundleConfig.twitter || !nodecg.bundleConfig.twitter.enabled) {
		return;
	}

	require('./auth')(nodecg, backendEvents);
	require('./twitter')(nodecg, backendEvents);
};
