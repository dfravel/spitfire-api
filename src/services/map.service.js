import vehicleDB from '../db/vehicle.database';
import logger from '../configs/winston.config';

const getVehiclesForMap = async (req, res) => {
  try {
    const vehicles = await vehicleDB.fetchForMap();

    if (vehicles.length > 0) {
      return res.status(200).json({
        message: 'Vehicles fetched successfully',
        count: vehicles.length,
        data: vehicles,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No vehicles found in the system for mapping purposes',
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
  getVehiclesForMap,
};
