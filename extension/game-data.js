'use strict';

module.exports = (nodecg, backendEvents) => {
	const gameData = nodecg.Replicant('gameData', {
		persistent: false
	});
	nodecg.Replicant('selectedGame', {
		defaultValue: 0
	});

	gameData.value = require('../shared/games/games.json');
};

