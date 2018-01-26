'use strict';

const nodecg = require('./util/nodecg-api-context').get();
const gameData = nodecg.Replicant('gameData');

const gameArray = [];

nodecg.bundleConfig.games.forEach( game => {
	gameArray.push( require(`../shared/games/${game.name}/characters`) );
});

gameData.value = gameArray;


