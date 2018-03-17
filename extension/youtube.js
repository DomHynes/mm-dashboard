'use strict';

const yt = require('youtube-api');
const ytdl = require('ytdl-core');
const Lien = require('lien');
const opn = require('opn');
const fs = require('fs');

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');

	const oauth = yt.authenticate({
		type: 'oauth',
		client_id: nodecg.bundleConfig.youtube.client_id,
		client_secret: nodecg.bundleConfig.youtube.client_secret,
		redirect_url: nodecg.bundleConfig.youtube.redirect_uri
	});

	// If (!tokenStore.value && tokenStore.value.yt) {
		new Lien({
			host: 'localhost',
			port: 5000
		})
			.addPage('/oauth2callback', lien => {
				oauth.getToken(lien.query.code, (err, tokens) => {
					if (err) {
						lien.lien(err, 400);
						return err;
					}
					lien.end('you did the thing');

					tokenStore.value = {
						yt: tokens
					};

					tokenStore.on('change', newData => {
						oauth.setCredentials(newData.yt);
						console.log(newData);

						// yt.videos.insert({
						// 	resource: {
						// 		snippet: {
						// 			title: 'test',
						// 			description: 'also test'
						// 		},
						// 		status: {
						// 			privacyStatus: 'private',
						// 			notifySubscribers: false
						// 		}
						// 	},
						// 	part: 'snippet, status',
						// 	media: {
						// 		body: fs.createReadStream('E:\\2016-02-19 18-07-17.flv')
						// 	}
						// }, (err, data) => {
						// 	console.log(err);
						// 	console.log(data);
						// 	console.log('done');
						// });
					});
				});
			});
		opn(oauth.generateAuthUrl({
			access_type: 'offline',
			scope: ['https://www.googleapis.com/auth/youtube']
		}));
	// } else {

	// }
};
