const logger = require('./../configs/winston.config');
const apiRoute = require('./apis');

const init = (server) => {
  // for debugging, I want to check what URL is being visited by the user
  server.get('*', (req, res, next) => {
    logger.info(`Request was made to: ${req.originalUrl}`);
    return next();
  });

  // get the rest of the routes that have been officially defined
  server.use('/api', apiRoute);

  // throw a not found error message if we've made it this far
  server.use((req, res) => {
    res.json({
      status: 404,
      message: 'Not Found',
    });
  });
};
module.exports = {
  init,
};
