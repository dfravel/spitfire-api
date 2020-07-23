/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import vehicleDestinationDB from '../db/vehicle_destination.database';
import vehicleDB from '../db/vehicle.database';

const getVehicleDestinations = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const destinations = await vehicleDestinationDB.fetch(vehicleID);

    if (destinations.length > 0) {
      return res.status(200).json({
        message: 'Vehicle Destinations fetched successfully',
        count: destinations.length,
        data: destinations,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No destination information found in the system for this vehicle',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);

    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getVehicleDestinationById = async (req, res) => {
  try {
    const vehicleDestination = await vehicleDestinationDB.findById(req.params.id);
    if (vehicleDestination) {
      return res.status(200).json({
        message: `vehicle destination with id ${req.params.id} fetched successfully`,
        data: vehicleDestination,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle destination found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const createVehicleDestination = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const newVehicleDestination = await vehicleDestinationDB.post(vehicleID, req);

    if (newVehicleDestination) {
      await vehicleDB.addDestination(vehicleID, newVehicleDestination._id);
      return res.status(201).json({
        message: 'new vehicle destination created successfully',
        data: [newVehicleDestination],
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

const updateVehicleDestination = async (req, res) => {
  try {
    const vehicleDestinationExists = await vehicleDestinationDB.findById(req.params.id);

    if (vehicleDestinationExists) {
      const updatedVehicleDestination = await vehicleDestinationDB.update(req.params.id, req);

      if (updatedVehicleDestination) {
        return res.status(201).json({
          message: 'vehicle destination updated successfully',
          data: updatedVehicleDestination,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle destination found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};

const deleteVehicleDestination = async (req, res) => {
  try {
    const vehicleId = req.params.vehicle_id;
    const vehicleDestination = await vehicleDestinationDB.destroy(req.params.id);
    if (vehicleDestination) {
      await vehicleDB.deleteDestination(vehicleId, req.params.id);
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle destination found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


module.exports = {
  getVehicleDestinations,
  createVehicleDestination,
  getVehicleDestinationById,
  updateVehicleDestination,
  deleteVehicleDestination,
};
