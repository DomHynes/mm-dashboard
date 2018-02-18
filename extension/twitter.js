'use strict';

module.exports = (nodecg, backendEvents) => {
	const TwStream = require('twitter');

	if (nodecg.bundleConfig.twitter.enabled !== true) {
		console.log('not loading twitter, disabled in config');
	} else {
		console.log('Loading twitter');

		const tw = new TwStream({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
		});

		nodecg.listenFor('twitter:getUser', (name, cb) => {
			tw.get('users/show', {
				screen_name: name
			})
				.then(data => cb(null, data))
				.catch(e => {
					console.log(e);
				});
		});
	}
};
