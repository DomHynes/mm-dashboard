'use strict';
const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
const nodecg = require('./util/nodecg-api-context').get();

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
