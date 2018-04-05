'use strict';

const Launchpad = require('launchpad-mini');

const NUMBER_OF_ROWS = 4;

const getScoreButtonColor = score =>
	score <= 0 // Team 2 plus button
		? Launchpad.Colors.red
		: score === 1
		? Launchpad.Colors.amber
		: Launchpad.Colors.green;

const colorScenes = async (pad, obsData, setInfo) => {
	const sceneButtons = obsData.scenes.scenes.map((scene, index) => {
		const x = index % NUMBER_OF_ROWS;
		const y = Math.floor(index / NUMBER_OF_ROWS);
		let color;

		if (obsData.studio.studioMode) {
			if (obsData.scenes.currentScene === scene.name) {
				color = Launchpad.Colors.red;
			} else if (obsData.preview.name === scene.name) {
				color = Launchpad.Colors.green;
			} else {
				color = Launchpad.Colors.amber;
			}
		} else if (!obsData.studio.studioMode) {
			if (obsData.scenes.currentScene === scene.name) {
				color = Launchpad.Colors.green;
			} else {
				color = Launchpad.Colors.amber;
			}
		}
		return [x, y, color];
	});



	const controlButtons = [];

	controlButtons.push([
		0, 8, obsData.studio.studioMode ? Launchpad.Colors.red : Launchpad.Colors.green // Studio mode button
	]);
	controlButtons.push([
		8, 6, Launchpad.Colors.red // Team 1 minus button
	], [
		8, 7, Launchpad.Colors.red // Team 2 minus button
	]);
	controlButtons.push(
		[8, 4, getScoreButtonColor(setInfo.scores[0])], // Team 1 plus button
		[8, 5, getScoreButtonColor(setInfo.scores[1])   // Team 2 plus button
	]);

	await pad.reset(0);
	await pad.setColors([].concat(sceneButtons, controlButtons));
};

const handleKey = async (key, nodecg, backendEvents) => {
	const data = nodecg.readReplicant('obs-data');
	const setInfo = nodecg.Replicant('set-info');

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

		if (key.x === 8 && key.y === 4) {
			setInfo.value.scores[0] += 1;
		}

		if (key.x === 8 && key.y === 5) {
			setInfo.value.scores[1] += 1;
		}

		if (key.x === 8 && key.y === 6) {
			setInfo.value.scores[0] -= 1;
		}

		if (key.x === 8 && key.y === 7) {
			setInfo.value.scores[1] -= 1;
		}
	}
};

module.exports = {
	colorScenes,
	handleKey
};
