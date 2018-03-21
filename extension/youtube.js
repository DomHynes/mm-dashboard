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

							lien.end('success', 200);

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

	nodecg.listenFor('yt:uploadSet', (set, cb) => {
		let video, progress;

		try {
			video = fs.createReadStream(path.join(set.video.basePath, set.video.videoName));
		} catch (e) {
			cb(e);
			return;
		}

		const uploadVideo = (set, tournament, cb) => {
			const players = set.players.map(teams =>
				teams.map((player, index, players) => {
					let name;
					if (player.sponsored &&
							player.sponsored.sponsored &&
							player.sponsored.sponsorName) {
						name = `${player.sponsored.sponsorName} | ${player.name}`;
					} else {
						name = player.name;
					}

					if (players.length > 1 && index !== players.length - 1) {
						return `${name},`;
					}

					return name;
				}).join(' ')).join(' vs ');

			console.log(players);

			const tournamentName = tournament.data.entities.hashtag ||
				tournament.data.entities.name;

			const upload = yt.videos.insert({
				resource: {
					snippet: {
						title: `${tournamentName} | ${players}`,
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
			}, (err, resource) => {
				if (err) {
					cb(err);
				}
				clearInterval(progress);

				console.log(upload);
				console.log(resource);

				set.video.snippet = resource.snippet;
				set.video.id = resource.id;

				backendEvents.emit('db:setDoc', set, (err, resp) => {
					if (err) {
						console.log(err);
					}
					set._rev = resp.rev;
					set.video.uploaded = upload.req.connection._bytesDispatched;
				});

				cb(null, resource);
			});

			progress = setInterval(() => {
				backendEvents.emit('db:setDoc', set, (err, resp) => {
					if (err) {
						console.log(err);
					}
					set._rev = resp.rev;
					set.video.uploaded = upload.req.connection._bytesDispatched;
				});
			}, 1000);
		};

		const tournaments = nodecg.readReplicant('tournamentDB');
		console.log(tournaments);
		const tournament = tournaments.find(tournament => tournament.data.entities.tournament.shortSlug === set.tournament.slug);
		uploadVideo(set, tournament, cb);
	});
};
