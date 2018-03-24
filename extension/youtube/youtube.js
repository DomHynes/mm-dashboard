'use strict';

// Const yt = require('youtube-api');
const {google} = require('googleapis');
const youtube = google.youtube('v3');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

module.exports = (nodecg, backendEvents) => {
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

			const tournamentName = tournament.data.entities.tournament.hashtag ||
				tournament.data.entities.tournament.name;

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
				},
				onUploadProgress: evt => {
					const progress = (evt.bytesRead / set.video.fileSize) * 100;
					console.log(`${Math.round(progress)}% complete`);
				}

			}, (err, resource) => {
				if (err) {
					cb(err);
				}

				console.log(upload);
				console.log(resource);

				set.video.snippet = resource.data.snippet;
				set.video.id = resource.data.id;

				backendEvents.emit('db:setDoc', set, (err, resp) => {
					if (err) {
						console.log(err);
					}
					set._rev = resp.rev;
					set.video.uploaded = upload.req.connection._bytesDispatched;
				});

				cb(null, resource);
			});
		};

		const tournaments = nodecg.readReplicant('tournamentDB');
		const tournament = tournaments.find(tournament => tournament._id === set.tournament._id);
		uploadVideo(set, tournament, cb);
	});
};
