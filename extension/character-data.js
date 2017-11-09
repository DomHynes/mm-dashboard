'use strict';
const fs = require('fs');
const path = require('path');


const nodecg = require('./util/nodecg-api-context').get();

const gameData = nodecg.Replicant('gameData');

const gameArray = [];

nodecg.bundleConfig.games.forEach( game => {
	const gamePath = path.join(__dirname, '..', 'shared', 'games', game.name, 'characters.json');
	fs.readFile(gamePath, (err, data) => {
		if (!err) {
			const currGameData = JSON.parse(data);
			currGameData.data = game;
			gameArray.push(currGameData);
		}
	});
});
console.log(gameArray);
gameData.value = gameArray;


