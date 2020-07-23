/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import vehicleInspectionDB from '../db/vehicle_inspection.database';
import vehicleDB from '../db/vehicle.database';

const getVehicleInspections = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;

    const inspections = await vehicleInspectionDB.fetch(vehicleID);

    if (inspections.length > 0) {
      return res.status(200).json({
        message: 'Vehicle Inspections fetched successfully',
        count: inspections.length,
        data: inspections,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No inspection information found in the system for this vehicle',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);

    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getVehicleInspectionById = async (req, res) => {
  try {
    const vehicleInspection = await vehicleInspectionDB.findById(req.params.id);
    if (vehicleInspection) {
      return res.status(200).json({
        message: `vehicle inspection with id ${req.params.id} fetched successfully`,
        data: vehicleInspection,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle inspection found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const createVehicleInspection = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const newVehicleInspection = await vehicleInspectionDB.post(vehicleID, req);

    if (newVehicleInspection) {
      await vehicleDB.addInspection(vehicleID, newVehicleInspection._id);
      return res.status(201).json({
        message: 'new vehicle inspection created successfully',
        data: [newVehicleInspection],
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

const updateVehicleInspection = async (req, res) => {
  try {
    const vehicleInspectionExists = await vehicleInspectionDB.findById(req.params.id);

    if (vehicleInspectionExists) {
      const updatedVehicleInspection = await vehicleInspectionDB.update(req.params.id, req);

      if (updatedVehicleInspection) {
        return res.status(201).json({
          message: 'vehicle inspection updated successfully',
          data: updatedVehicleInspection,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle inspection found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const deleteVehicleInspection = async (req, res) => {
  try {
    const vehicleId = req.params.vehicle_id;
    const vehicleInspection = await vehicleInspectionDB.destroy(req.params.id);
    if (vehicleInspection) {
      await vehicleDB.deleteInspection(vehicleId, req.params.id);
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No inspection found in the system',
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
  getVehicleInspections,
  getVehicleInspectionById,
  createVehicleInspection,
  updateVehicleInspection,
  deleteVehicleInspection,

};
