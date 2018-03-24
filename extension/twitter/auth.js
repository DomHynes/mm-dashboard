'use strict';
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const fetch = require('node-fetch');

const TwitterStrategy = require('passport-twitter').Strategy;
const app = express();

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');

	tokenStore.once('change', data => {
		console.log(data);

		// If (data.twitch && data.twitch.refreshToken) {
		// 	fetch('https://id.twitch.tv/oauth2/token' +
		// 		'?grant_type=refresh_token' +
		// 		`&refresh_token=${data.twitch.refreshToken}` +
		// 		`&client_id=${nodecg.bundleConfig.twitch.clientID}` +
		// 		`&client_secret=${nodecg.bundleConfig.twitch.clientSecret}`, {
		// 		method: 'POST'
		// 	})
		// 	.then(resp => resp.json())
		// 	.then(json => {
		//
		// 	});
		// }

		tokenStore.on('change', data => {
			console.log(data);
		});

		app.use(session({secret: 'ssh'}));

		app.use(passport.initialize());

		passport.use(new TwitterStrategy(
			nodecg.bundleConfig.twitter,
			(token, tokenSecret, profile, done) => {
				Object.assign(tokenStore.value.twitter, {
					token, tokenSecret, profile
				});
				return done(null, true);
			}
		));

		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser((user, done) => {
			done(null, user);
		});

		app.get('/ext-auth/twitter', passport.authenticate('twitter'));
		app.get('/ext-auth/twitter/callback', passport.authenticate('twitter', {forceVerify: true}), (req, res) => {
			res.redirect('/');
		});

		nodecg.mount(app);
	});
};
