'use strict';

module.exports = (nodecg, backendEvents) => {
	const Twit = require('twit');
	const tokenStore = nodecg.Replicant('token-store');

	let tw;

	tokenStore.on('change', newData => {
		console.log(newData);
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

		nodecg.listenFor('twitter:post', async (data, cb) => {
			console.log(`tweeting: ${data}`);
			const tweet = await tw.post('statuses/update', {status: data});
			console.log(tweet);
			if (tweet.data.errors && tweet.data.errors.length > 0) {
				tweet.errors.forEach(err => console.log(err));
				return cb(tweet.errors);
			}
			cb(null, tweet);
		});
	});
};
