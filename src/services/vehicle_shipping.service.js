/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import vehicleShippingDB from '../db/vehicle_shipping.database';
import vehicleDB from '../db/vehicle.database';

const getVehicleShipping = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;

    const shipping = await vehicleShippingDB.fetch(vehicleID);

    if (shipping.length > 0) {
      return res.status(200).json({
        message: 'Vehicle Shipping fetched successfully',
        count: shipping.length,
        data: shipping,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No shipping information found in the system for this vehicle',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);

    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getVehicleShippingById = async (req, res) => {
  try {
    const vehicleShipping = await vehicleShippingDB.findById(req.params.id);
    if (vehicleShipping) {
      return res.status(200).json({
        message: `vehicle shipping with id ${req.params.id} fetched successfully`,
        data: vehicleShipping,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle shipping found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const createVehicleShipping = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const newVehicleShipping = await vehicleShippingDB.post(vehicleID, req);

    if (newVehicleShipping) {
      await vehicleDB.addShipping(vehicleID, newVehicleShipping._id);
      return res.status(201).json({
        message: 'new vehicle shipping created successfully',
        data: [newVehicleShipping],
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

const updateVehicleShipping = async (req, res) => {
  try {
    const vehicleShippingExists = await vehicleShippingDB.findById(req.params.id);

    if (vehicleShippingExists) {
      const updatedVehicleShipping = await vehicleShippingDB.update(req.params.id, req);

      if (updatedVehicleShipping) {
        return res.status(201).json({
          message: 'vehicle shipping updated successfully',
          data: updatedVehicleShipping,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle shipping found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const deleteVehicleShipping = async (req, res) => {
  try {
    const vehicleId = req.params.vehicle_id;
    const vehicleShipping = await vehicleShippingDB.destroy(req.params.id);
    if (vehicleShipping) {
      await vehicleDB.deleteShipping(vehicleId, req.params.id);
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No contract found in the system',
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
  getVehicleShipping,
  getVehicleShippingById,
  createVehicleShipping,
  updateVehicleShipping,
  deleteVehicleShipping,

};
