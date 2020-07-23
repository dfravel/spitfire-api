/* eslint-disable no-underscore-dangle */
import vehicleDB from '../db/vehicle.database';
import logger from '../configs/winston.config';
import contractLineDB from '../db/contract_line.database';
import vehicleMaintenanceDB from '../db/vehicle_maintenance.database';
import vehicleDestinationDB from '../db/vehicle_destination.database';
import vehicleShippingDB from '../db/vehicle_shipping.database';
import vehicleInspectionDB from '../db/vehicle_inspection.database';

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleDB.fetch({});

    if (vehicles.length > 0) {
      return res.status(200).json({
        message: 'vehicles fetched successfully',
        data: vehicles,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicles found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again. The detailed error message is: ${error.message}`,
    });
  }
};

const getVehicleByVehicleId = async (req, res) => {
  try {
    const vehicleID = req.params.vehicle_id;
    const vehicles = await vehicleDB.fetchByVehicleId(vehicleID);

    if (vehicles) {
      return res.status(200).json({
        message: 'vehicle fetched successfully',
        count: vehicles.length,
        data: vehicles,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: `No vehicles found in the system for vehicle id ${vehicleID}`,
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again. The detailed error message is: ${error.message}.`,
    });
  }
};


const getVehiclesByContractId = async (req, res) => {
  try {
    const contractID = req.params.contract_id;
    const vehicles = await vehicleDB.fetchByContractId(contractID);

    if (vehicles.length > 0) {
      return res.status(200).json({
        message: 'vehicles fetched successfully',
        count: vehicles.length,
        data: vehicles,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: `No vehicles found in the system for contract id ${contractID}`,
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again. The detailed error message is: ${error.message}`,
    });
  }
};


const createVehicleByContractId = async (req, res) => {
  try {
    const contractID = req.params.contract_id;
    const contractLineID = req.params.contract_line_id;


    const newVehicle = await vehicleDB.post(contractID, contractLineID, req);
    if (newVehicle) {
      await contractLineDB.addVehicle(contractLineID, newVehicle._id);

      return res.status(201).json({
        message: 'new vehicle created successfully',
        data: newVehicle,
      });
    }
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again. The detailed error message is: ${error.message}`,
    });
  }
};


const updateVehicle = async (req, res) => {
  try {
    const vehicleExists = await vehicleDB.fetchByVehicleId(req.params.vehicle_id);

    if (vehicleExists) {
      const updatedVehicle = await vehicleDB.update(req.params.vehicle_id, req);

      if (updatedVehicle) {
        return res.status(201).json({
          message: 'vehicle updated successfully',
          data: updatedVehicle,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `something went wrong, Please try again. The specific error message is ${error.message}`,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    // quick find to get the contractLineId
    logger.info(`the vehicle id is ${req.params.vehicle_id}`);
    const contractLine = await vehicleDB.fetchByVehicleId(req.params.vehicle_id);

    if (contractLine) {
      logger.info(`the contract detail id is ${contractLine.contract_line_id}`);
    }


    const vehicle = await vehicleDB.destroy(req.params.vehicle_id);
    if (vehicle) {
      // cascading delete include pull from contract line
      if (contractLine) {
        const contractLineId = contractLine.contract_line_id;
        await contractLineDB.deleteVehicle(contractLineId, req.params.vehicle_id);
      }
      await vehicleDestinationDB.deleteByVehicleId(req.params.vehicle_id);
      await vehicleInspectionDB.deleteByVehicleId(req.params.vehicle_id);
      await vehicleMaintenanceDB.deleteByVehicleId(req.params.vehicle_id);
      await vehicleShippingDB.deleteByVehicleId(req.params.vehicle_id);
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vehicle found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again. The error message is ${error.message}`,
    });
  }
};


module.exports = {
  getAllVehicles,
  getVehicleByVehicleId,
  getVehiclesByContractId,
  createVehicleByContractId,
  updateVehicle,
  deleteVehicle,
};
