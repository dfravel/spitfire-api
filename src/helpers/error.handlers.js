/* eslint-disable func-names */
import logger from '../configs/winston.config';

exports.notFound = (req, res, next) => {
  logger.info(
    `Oops! That URL was not found. The request was made to: ${req.originalUrl}`,
  );
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};
