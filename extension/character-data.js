'use strict';

module.exports = (nodecg, backendEvents) => {
	const gameData = nodecg.Replicant('gameData');

	const gameArray = [];

	nodecg.bundleConfig.games.forEach(game => {
		gameArray.push(require(`../shared/games/${game.name}/characters`));
	});

	gameData.value = gameArray;
};

