'use strict';
const express = require('express');
const passport = require('passport');

const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const YoutubeStrategy = require('passport-youtube-v3').Strategy;
const app = express();

module.exports = (nodecg, backendEvents) => {
	const tokenStore = nodecg.Replicant('token-store');

	const oauth = new OAuth2(
		nodecg.bundleConfig.youtube.clientID,
		nodecg.bundleConfig.youtube.clientSecret,
		nodecg.bundleConfig.youtube.callbackURL
	);

	google.options({
		auth: oauth
	});

	tokenStore.once('change', data => {
		app.use(passport.initialize());

		oauth.credentials = {
			access_token: data.youtube.accessToken,
			refresh_token: data.youtube.refreshToken
		};
		console.log(oauth.credentials);
		console.log(data.youtube);

		passport.use(new YoutubeStrategy(
			nodecg.bundleConfig.youtube,
			(accessToken, refreshToken, profile, done) => {
				oauth.credentials = {
					access_token: accessToken,
					refresh_token: refreshToken
				};

				Object.assign(tokenStore.value.youtube, {
					accessToken, refreshToken, profile
				});
				console.log(tokenStore.value)

				return done(null, true);
			}
		));

		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser((user, done) => {
			done(null, user);
		});

		app.get('/ext-auth/youtube', passport.authenticate('youtube'));
		app.get('/ext-auth/youtube/callback', passport.authenticate('youtube', {forceVerify: true}), (req, res) => {
			res.redirect('/');
		});

		nodecg.mount(app);
	});
};
