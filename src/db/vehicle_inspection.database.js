import VehicleInspection from '../models/vehicle_inspection.model';

const mongoose = require('mongoose');


const fetch = async (req) => {
  const inspection = await VehicleInspection.find({ vehicle_id: req });
  return inspection;
};

const findById = async (req) => {
  const findVehicleInspection = await VehicleInspection.findById(req).populate('attachments');
  return findVehicleInspection;
};

const post = async (vehicleId, req) => {
  const convertedVehicleId = mongoose.Types.ObjectId(vehicleId);

  const insertVehicleInspection = new VehicleInspection({
    vehicle_id: convertedVehicleId,
    inspection_type: req.body.inspection_type,
    inspection_personnel: req.body.inspection_personnel,
    approval_dt: req.body.approval_dt,
    percent_complete: req.body.percent_complete,

  });

  const newVehicleInspection = await VehicleInspection.create(insertVehicleInspection);
  return newVehicleInspection;
};

const update = async (vehicleInspectionId, req) => {
  const updateVehicleInspection = await VehicleInspection.findByIdAndUpdate(vehicleInspectionId,
    { $set: req.body }, { new: true });
  return updateVehicleInspection;
};


const destroy = async (req) => {
  const destroyVehicleInspection = await VehicleInspection.deleteById(req);
  return destroyVehicleInspection;
};

// for cascading deletes - when we delete a vehicle we need to delete the sub documents
const deleteByVehicleId = async (req) => {
  const destroyByVehicleId = await VehicleInspection.delete({ vehicle_id: req });
  return destroyByVehicleId;
};


module.exports = {
  fetch,
  findById,
  post,
  update,
  destroy,
  deleteByVehicleId,
};
