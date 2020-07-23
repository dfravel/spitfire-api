/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import vehicleMaintenanceDB from '../db/vehicle_maintenance.database';
import vehicleDB from '../db/vehicle.database';

const getVehicleMaintenance = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;

    const inspections = await vehicleMaintenanceDB.fetch(vehicleID);

    if (inspections.length > 0) {
      return res.status(200).json({
        message: 'Vehicle Maintenance fetched successfully',
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

const getVehicleMaintenanceById = async (req, res) => {
  try {
    const vehicleMaintenance = await vehicleMaintenanceDB.findById(req.params.id);
    if (vehicleMaintenance) {
      return res.status(200).json({
        message: `vehicle maintenance with id ${req.params.id} fetched successfully`,
        data: vehicleMaintenance,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle maintenance found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const createVehicleMaintenance = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const newVehicleMaintenance = await vehicleMaintenanceDB.post(vehicleID, req);

    if (newVehicleMaintenance) {
      await vehicleDB.addMaintenance(vehicleID, newVehicleMaintenance._id);
      return res.status(201).json({
        message: 'new vehicle maintenance created successfully',
        data: [newVehicleMaintenance],
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

const updateVehicleMaintenance = async (req, res) => {
  try {
    const vehicleMaintenanceExists = await vehicleMaintenanceDB.findById(req.params.id);

    if (vehicleMaintenanceExists) {
      const updatedVehicleMaintenance = await vehicleMaintenanceDB.update(req.params.id, req);

      if (updatedVehicleMaintenance) {
        return res.status(201).json({
          message: 'vehicle maintenance updated successfully',
          data: updatedVehicleMaintenance,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle maintenance found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const deleteVehicleMaintenance = async (req, res) => {
  try {
    const vehicleId = req.params.vehicle_id;
    const vehicleMaintenance = await vehicleMaintenanceDB.destroy(req.params.id);
    if (vehicleMaintenance) {
      await vehicleDB.deleteMaintenance(vehicleId, req.params.id);
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No maintenance found in the system',
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
  getVehicleMaintenance,
  getVehicleMaintenanceById,
  createVehicleMaintenance,
  updateVehicleMaintenance,
  deleteVehicleMaintenance,

};
