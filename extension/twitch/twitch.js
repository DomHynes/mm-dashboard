'use strict';

const axios = require('axios');
const CircularJSON = require('circular-json');

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');

	const helix = axios.create({
		baseURL: 'https://api.twitch.tv/helix/'
	});

	tokenStore.on('change', async newData => {
		helix.defaults.headers.common.Authorization = `Bearer ${newData.twitch.accessToken}`;
		const broadcasterID = await helix.get('/users', {
			params: {login: 'btssmash'}
		});
		const clip = await helix.post('/clips', {
			broadcaster_id: broadcasterID.data.data[0].id
		});
	});

	nodecg.listenFor('twitch:getClip', (channel, cb) => {

	});
};
