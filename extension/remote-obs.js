'use strict';

module.exports = (nodecg, backendEvents) => {
	const OBSWebSocket = require('obs-websocket-js');
	const obs = new OBSWebSocket();

	if (nodecg.bundleConfig.obs.enabled) {
		obs.connect({
			address: 'localhost:4444'
		});

		obs.on('ConnectionOpened', data => {
			console.log('ConnectionOpened');
			console.log(data);
		});

		obs.on('ConnectionOpened', data => {
			console.log('ConnectionOpened');
			console.log(data);
		});
	}
};
