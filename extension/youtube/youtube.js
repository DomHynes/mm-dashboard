'use strict';

// Const yt = require('youtube-api');
const google = require('googleapis');
const youtube = google.youtube('v3');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

module.exports = (nodecg, backendEvents) => {
	nodecg.listenFor('yt:uploadSet', (set, cb) => {
		let video;
		let progress;

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

			const tournamentName = tournament.data.entities.tournament.hashtag ||
				tournament.data.entities.tournament.name;

			backendEvents.emit('db:setDoc', Object.assign({}, set, {video: {uploading: true}}), (err, resp) => {
				if (err) {
					console.log(err);
				}
				set._rev = resp.rev;
			});

			const upload = youtube.videos.insert({
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
				part: 'id,snippet, status',
				media: {
					body: video
				}
			}, (err, resource) => {
				clearInterval(progress);
				if (err) {
					console.log(err);
					return cb(err);
				}

				console.log(resource);

				set.video.snippet = resource.snippet;
				set.video.id = resource.id;

				backendEvents.emit('db:setDoc', set, (err, resp) => {
					if (err) {
						console.log(err);
						return;
					}
					set._rev = resp.rev;
				});

				cb(null, resource);
			});

			progress = setInterval(() => {
				console.log(upload.req.socket._bytesDispatched);
				set.video.uploaded = upload.req.connection._bytesDispatched;

				backendEvents.emit('db:setDoc', set, (err, resp) => {
					if (err) {
						console.log(err);
						return;
					}
					set._rev = resp.rev;
					set.video.uploaded = upload.req.connection._bytesDispatched;
				});

			}, 500);
		};

		const tournaments = nodecg.readReplicant('tournamentDB');
		const tournament = tournaments.find(tournament => tournament._id === set.tournament._id);
		uploadVideo(set, tournament, cb);
	});
};
