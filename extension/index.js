'use strict';

const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {
	nodecgApiContext.set(nodecg);

	require('./character-data');
	require('./remote-obs');
	require('./smashgg');
	require('./db');
	// require('./twitter');
};

