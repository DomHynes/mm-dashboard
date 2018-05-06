'use strict';
const express = require('express');
const passport = require('passport');
const axios = require('axios');

const TwitchStrategy = require('passport-twitch').Strategy;
const app = express();

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');

	tokenStore.once('change', () => {
		backendEvents.on('twitch:refreshToken', (data, cb) => {
			axios.post('https://id.twitch.tv/oauth2/token' +
				'?grant_type=refresh_token' +
				`&refresh_token=${tokenStore.value.twitch.refreshToken}` +
				`&client_id=${nodecg.bundleConfig.twitch.clientID}` +
				`&client_secret=${nodecg.bundleConfig.twitch.clientSecret}`)
				.then(resp => {
					Object.assign(tokenStore.value.twitch, {
						accessToken: resp.data.access_token,
						refreshToken: resp.data.refresh_token
					});
				})
				.catch(e => {
					console.log(e);
					cb(e);
				});
		});

		app.use(passport.initialize());

		passport.use(new TwitchStrategy(
			nodecg.bundleConfig.twitch,
			(accessToken, refreshToken, profile, done) => {
				Object.assign(tokenStore.value.twitch, {
					accessToken, refreshToken, profile
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

		app.get('/ext-auth/twitch', passport.authenticate('twitch'));
		app.get('/ext-auth/twitch/callback', passport.authenticate('twitch', {forceVerify: true}), (req, res) => {
			res.redirect('/');
		});

		nodecg.mount(app);
	});
};
