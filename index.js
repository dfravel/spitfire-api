require('dotenv').config({ path: '.env' });
const config = require('./src/configs/settings.config');
const server = require('./src/configs/server.config');
const db = require('./src/configs/database.config');


// create the basic server setup
server.create(config, db);

// start the server
server.start();
