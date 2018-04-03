'use strict';

const colorScenes = (pad, scenes) => {
	const line = '';

	scenes.scenes.forEach( scene => {
		line.push('x');
	});
	console.log(line);

	line.padEnd(8, '-');
	console.log(line);
	line.push('o');
	console.log(line);
	pad.col(pad.yellow, pad.fromMap(
		line        +
		'xxxxxxxxo' +
		'xxxxxxxxo' +
		'--------o' +
		'--------o' +
		'--------o' +
		'--------o' +
		'--------o' +
		'oooooooo '));
};

const setupPad = pad => {
	pad.reset(0);
	colorScenes(pad, []);
};

module.exports = {
	colorScenes,
	setupPad
};
