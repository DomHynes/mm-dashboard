'use strict';

module.exports = (nodecg, backendEvents, obs) => {
	const obsData = nodecg.Replicant('obs-data');

	const updateData = async () => {
		const scenes = await obs.getSceneList();
		const studio = await obs.getStudioModeStatus();
		let preview;
		if (studio.studioMode) {
			preview = await obs.getPreviewScene();
		} else {
			preview = null;
		}

		obsData.value = {
			scenes,
			studio,
			preview
		};
	};

	obs.on('SwitchScenes', async () => {
		console.log('SwitchScenes');
		await updateData();
	});

	obs.on('StudioModeSwitched', async () => {
		console.log('StudioModeSwitched');
		await updateData();
	});

	obs.on('PreviewSceneChanged', async () => {
		console.log('PreviewSceneChanged');
		await updateData();
	});

	obs.on('ConnectionOpened', async () => {
		console.log('ConnectionOpened');
		await updateData();
	});

	backendEvents.on('obs:message', async data => {
		console.log(data);
		await obs.send(data.method, data.data);
		await updateData();
	});
};
