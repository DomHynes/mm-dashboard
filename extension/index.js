'use strict';

const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {
	nodecgApiContext.set(nodecg);

	require('./character-data');
	require('./remote-obs');
	require('./smashgg');
	// require('./twitter');

	const playerDB = nodecg.Replicant('playerDB');

	playerDB.on('change', db => {
		console.log(db);
	});
};

