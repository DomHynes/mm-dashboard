'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = (nodecg, backendEvents) => {
	nodecg.listenFor('yt:grabLatestVOD', (data, cb) => {
		console.log(data);
		fs.readdir(data, (err, list) => {
			if (err) {
				console.log(err);
				return;
			}
			const sortedFiles = list
				.filter(file => {
					try {
						if (!fs.statSync(path.join(data, file)).isFile()) {
							return 0;
						}
						return 1;
					} catch (e) {
						return 0;
					}
				})
				.map(file => {
					try {
						const stats = fs.statSync(path.join(data, file));
						return {
							videoName: file,
							date: stats.mtime,
							fileSize: stats.size,
							basePath: data
						};
					} catch (e) {
						console.log(e);
					}
				})
				.sort((file1, file2) => moment.utc(file2.date).diff(moment.utc(file1.date)));

			cb(null, sortedFiles[0]);
		});
	});
};
