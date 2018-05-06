'use strict';

const axios = require('axios');
const CircularJSON = require('circular-json');
const moment = require('moment');

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');
	const clipData = nodecg.Replicant('clipData', {
		defaultValue: {
			timestamp: '',
			edit_url: '',
			id: ''
		}
	});

	const helix = axios.create({
		baseURL: 'https://api.twitch.tv/helix/'
	});

	helix.interceptors.response.use(
		response => response,
		err => {
			console.log(err);
			if (err.response.status === 401) {
				backendEvents.emit('twitch:refreshToken');
			}
			return err;
		}
	);

	tokenStore.on('change', async newData => {
		helix.defaults.headers.common.Authorization = `Bearer ${newData.twitch.accessToken}`;
	});

	tokenStore.once('change', async newData => {
		nodecg.listenFor('twitch:getClip', async (channel, cb) => {
			try {
				const broadcasterID = await helix.get('/users', {
					params: {login: channel}
				});
				const clip = await helix.post('/clips', {
					broadcaster_id: broadcasterID.data.data[0].id
				});
				clipData.value = Object.assign({}, clip.data.data[0], {
					timestamp: moment().format('D/M/YYYY h:ma')
				});
				cb(null, clip.data);
			} catch (e) {
				console.log(e);
				cb({message: e.message});
			}
		});
	});
};
