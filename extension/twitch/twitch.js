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
	});

	tokenStore.once('change', async newData => {
    nodecg.listenFor('twitch:getClip', async (channel, cb) => {
    	console.log(channel);
    	try {
        const broadcasterID = await helix.get('/users', {
          params: {login: channel},
        });
        const clip = await helix.post('/clips', {
          broadcaster_id: broadcasterID.data.data[0].id
        });
        cb(null, clip.data);
      } catch (e) {
    		console.log(e);
    		cb({message: e.message});
			}
    });
	})
};
