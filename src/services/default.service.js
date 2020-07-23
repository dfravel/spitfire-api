import logger from '../configs/winston.config';

const get = async (req, res) => {
  try {
    return res.status(200).json({
      message: `Welcome to the Spitfire API. There's nothing else to see here`,
    });
  } catch (error) {
    //   log the error so that we can review it
    logger.info(`An error occured with this request. ${error.message}`);

    // return an error to the requestor
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};


module.exports = {
  get,
};
