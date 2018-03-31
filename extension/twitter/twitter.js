'use strict';

module.exports = (nodecg, backendEvents) => {
	const Twit = require('twit');
	const tokenStore = nodecg.Replicant('token-store');

	let tw;

	tokenStore.on('change', newData => {
		tw = new Twit({
			consumer_key: nodecg.bundleConfig.twitter.consumerKey,
			consumer_secret: nodecg.bundleConfig.twitter.consumerSecret,
			access_token: newData.twitter.token,
			access_token_secret: newData.twitter.tokenSecret
		});
	});

	tokenStore.once('change', () => {
		nodecg.listenFor('twitter:getUser', (name, cb) => {
			tw.get('users/show', {
				screen_name: name
			})
				.then(data => cb(null, data))
				.catch(e => {
					console.log(e);
				});
		});

		nodecg.listenFor('twitter:post', (data, cb) => {
			tw.post('statuses/update', {status: data})
				.then(tweet => {
					console.log(tweet);
					cb(null, tweet);
				})
				.catch(e => {
					console.log(e);
					cb(e);
				});
		});
	});
};
