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
		tokenStore.on('change', data => {});

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
