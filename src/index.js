require('babel-polyfill');

const server = require('./configs/server.config');
const config = require('./configs/settings.config');
const db = require('./configs/database.config');

// create the basic server setup
server.create(config, db);

// start the server
server.start();
