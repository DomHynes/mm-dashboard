'use strict';

module.exports = (nodecg, backendEvents) => {
	const gameData = nodecg.Replicant('gameData');

	gameData.value = require('../shared/games/games.json');
};

