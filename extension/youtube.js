'use strict';

const yt = require('youtube-api');
const ytdl = require('ytdl-core');
const Lien = require('lien');
const opn = require('opn');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');
	const setinfo = nodecg.Replicant('set-info');

	const oauth = yt.authenticate({
		type: 'oauth',
		client_id: nodecg.bundleConfig.youtube.client_id,
		client_secret: nodecg.bundleConfig.youtube.client_secret,
		redirect_url: nodecg.bundleConfig.youtube.redirect_uri
	});

	tokenStore.on('change', newData => {
		if (!tokenStore.value || !tokenStore.value.yt || moment.utc(newData.yt.expiry_date).isBefore(moment())) {
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

							tokenStore.value = {
								yt: tokens
							};
						});
					});
				opn(oauth.generateAuthUrl({
					access_type: 'offline',
					scope: ['https://www.googleapis.com/auth/youtube']
				}));
		}
		oauth.setCredentials(newData.yt);
	});

	nodecg.listenFor('yt:uploadSet', (data, cb) => {
		console.log(data);
		let video;
		try {
			video = fs.createReadStream(path.join(data.video.basePath, data.video.videoName));
		} catch (e) {
			cb(e);
			return;
		}
		const upload = yt.videos.insert({
			resource: {
				snippet: {
					title: 'test',
					description: 'also test'
				},
				status: {
					privacyStatus: 'private',
					notifySubscribers: false
				}
			},
			part: 'snippet, status',
			media: {
				body: video
			}
		}, (err, data) => {
			if (err) {
				cb(err);
			}
			cb(null, data);
		});
		const progress = setInterval(() => {
			try {
				console.log(upload.req.connection._bytesDispatched);
				setinfo.value.video.uploaded = upload.req.connection._bytesDispatched;

				console.log(setinfo.value);
			} catch (e) {
				console.log(e);
			}
		}, 1000);
	});
};
