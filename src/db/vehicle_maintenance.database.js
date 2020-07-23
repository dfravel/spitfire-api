import VehicleMaintenance from '../models/vehicle_maintenance.model';

const mongoose = require('mongoose');


const fetch = async (req) => {
  const maintenance = await VehicleMaintenance.find({ vehicle_id: req });
  return maintenance;
};

const findById = async (req) => {
  const findVehicleMaintenance = await VehicleMaintenance.findById(req).populate('attachments');
  return findVehicleMaintenance;
};

const post = async (vehicleId, req) => {
  const convertedVehicleId = mongoose.Types.ObjectId(vehicleId);

  const insertVehicleMaintenance = new VehicleMaintenance({
    vehicle_id: convertedVehicleId,
    maintenance_process: req.body.maintenance_process,
    description: req.body.description,
    required_dt: req.body.required_dt,
    completed_dt: req.body.completed_dt,
    technician: req.body.technician,
  });

  const newVehicleMaintenance = await VehicleMaintenance.create(insertVehicleMaintenance);
  return newVehicleMaintenance;
};

const update = async (vehicleMaintenanceId, req) => {
  const updateVehicleMaintenance = await VehicleMaintenance.findByIdAndUpdate(vehicleMaintenanceId,
    { $set: req.body }, { new: true });
  return updateVehicleMaintenance;
};


const destroy = async (req) => {
  const destroyVehicleMaintenance = await VehicleMaintenance.deleteById(req);
  return destroyVehicleMaintenance;
};

// for cascading deletes - when we delete a vehicle we need to delete the sub documents
const deleteByVehicleId = async (req) => {
  const destroyByVehicleId = await VehicleMaintenance.delete({ vehicle_id: req });
  return destroyByVehicleId;
};

// const deleteByContractId = async (req) => {
//   const destroyByContractId = await ContractLine.remove({ contract_id: req });
//   return destroyByContractId;
// };


module.exports = {
  fetch,
  findById,
  post,
  update,
  destroy,
  deleteByVehicleId,
};
