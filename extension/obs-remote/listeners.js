'use strict';

module.exports = (nodecg, backendEvents, obs) => {
	const obsScenes = nodecg.Replicant('obs-scenes');
	obs.on('ConnectionOpened', data => {
		console.log('ConnectionOpened');
		console.log(data);
	});

	obs.on('ConnectionOpened', data => {
		console.log('ConnectionOpened');
		obs.getSceneList().then(scenes => {
			console.log(scenes);
		});
	});
};
