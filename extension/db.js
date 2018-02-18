'use strict';

const nodecg = require('./util/nodecg-api-context').get();
const PouchDB = require('pouchdb');
const shortid = require('shortid');
const ajv = require('ajv');

PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-live-find'));

const db = new PouchDB('pouchdb/smashdb');
const playerDB = nodecg.Replicant('playerDB');

const playerQuery = db.liveFind({
	selector: {},
	aggregate: true
});

playerQuery.on('ready', () => {
	console.log('playerQuery ready');
});

playerQuery.on('update', (update, aggregate) => {
	playerDB.value = aggregate;
});

nodecg.listenFor('db:addDoc', (data, cb) => {
	data.doc._id = `${data.type}-${shortid.generate()}`;
	db.put(data.doc)
		.then(resp => {
			cb(null, resp);
		})
		.catch(err => {
			cb(err);
		});
});

db.allDocs()
	.then(resp => {
		console.log(resp);
	});

