/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import vehicleDB from '../db/vehicle.database';

const getVehicleMileage = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;

    // logger.info(`the vehicle if we are looking for is ${vehicleID}`);
    const mileage = await vehicleDB.fetchMileageById(vehicleID);

    if (mileage) {
      return res.status(200).json({
        message: 'Vehicle Mileage fetched successfully',
        count: mileage.length,
        data: mileage,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No mileage information found in the system for this vehicle',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);

    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};


const createVehicleMileage = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const newVehicleMileage = await vehicleDB.postMileageById(vehicleID, req);

    if (newVehicleMileage) {
      return res.status(201).json({
        message: 'new vehicle mileage created successfully',
        data: [newVehicleMileage],
      });
    }
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


module.exports = {
  getVehicleMileage,
  createVehicleMileage,
};
