/* eslint-disable no-unused-expressions */
import logger from './winston.config';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();

require('dotenv').config({ path: '.env' });

const create = (config, db) => {
  let databaseUri;

  logger.info(`the current environment is: ${process.env.SPITFIRE_ENV}`);

  (process.env.SPITFIRE_ENV === 'development' ? (
    databaseUri = db.development.database_srv + db.development.database_name) : (
    databaseUri = db.production.database_srv + db.production.database_user
    + db.production.database_pwd + db.production.database_cluster
    + db.production.database_name + db.production.database_opts)
  );

  logger.info(`the database connection string is: ${databaseUri}`);

  // eslint-disable-next-line global-require
  const routes = require('./../routes');
  // set all the server things
  server.set('env', config.env);
  server.set('port', config.port);
  server.set('hostname', config.hostname);

  server.use(cors());

  // add middleware to parse the json
  server.use(bodyParser.json());
  server.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );


  mongoose.connect(databaseUri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

  // Set up routes
  routes.init(server);
};

const start = () => {
  const hostname = server.get('hostname');
  const port = server.get('port');

  server.listen(port, () => {
    logger.info(`Express server listening on - http://${hostname}:${port}`);
  });
};

module.exports = {
  create,
  start,
};
