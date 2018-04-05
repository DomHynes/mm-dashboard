'use strict';

const Launchpad = require('launchpad-mini');

const NUMBER_OF_ROWS = 4;

const colorScenes = async (pad, data) => {
	const sceneButtons = data.scenes.scenes.map((scene, index) => {
		const x = index % NUMBER_OF_ROWS;
		const y = Math.floor(index / NUMBER_OF_ROWS);
		let color;

		if (data.studio.studioMode) {
			if (data.scenes.currentScene === scene.name) {
				color = Launchpad.Colors.red;
			} else if (data.preview.name === scene.name) {
				color = Launchpad.Colors.green;
			} else {
				color = Launchpad.Colors.amber;
			}
		} else if (!data.studio.studioMode) {
			if (data.scenes.currentScene === scene.name) {
				color = Launchpad.Colors.green;
			} else {
				color = Launchpad.Colors.amber;
			}
		}
		return [x, y, color];
	});

	const controlButtons = [];

	controlButtons.push([
		0, 8, data.studio.studioMode ? Launchpad.Colors.red : Launchpad.Colors.green
	]);

	await pad.reset(0);
	await pad.setColors([].concat(sceneButtons, controlButtons));
};

const handleKey = async (key, nodecg, backendEvents) => {
	const data = nodecg.readReplicant('obs-data');
	if (key.pressed) {
		const sceneIndex = (key.y * NUMBER_OF_ROWS) + (key.x);

		if (sceneIndex < data.scenes.scenes.length) {
			if (data.studio.studioMode) {
				if (data.scenes.scenes[sceneIndex].name === data.preview.name) {
					backendEvents.emit('obs:message', {
						method: 'SetCurrentScene',
						data: {
							'scene-name': data.scenes.scenes[sceneIndex].name
						}
					});
				} else {
					backendEvents.emit('obs:message', {
						method: 'SetPreviewScene',
						data: {
							'scene-name': data.scenes.scenes[sceneIndex].name
						}
					});
				}
			} else {
				backendEvents.emit('obs:message', {
					method: 'SetCurrentScene',
					data: {
						'scene-name': data.scenes.scenes[sceneIndex].name
					}
				});
			}
		}

		if (key.x === 0 && key.y === 8) {
			backendEvents.emit('obs:message', {
				method: 'ToggleStudioMode'
			});
		}
	}
};

module.exports = {
	colorScenes,
	handleKey
};
