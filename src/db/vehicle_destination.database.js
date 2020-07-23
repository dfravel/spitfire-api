import VehicleDestination from '../models/vehicle_destination.model';

const mongoose = require('mongoose');


const fetch = async (req) => {
  const destinations = await VehicleDestination.find({ vehicle_id: req });
  return destinations;
};

const findById = async (req) => {
  const findVehicleDestination = await VehicleDestination.findById(req);
  return findVehicleDestination;
};

const post = async (vehicleId, req) => {
  const convertedVehicleId = mongoose.Types.ObjectId(vehicleId);
  const convertedPostId = mongoose.Types.ObjectId(req.post_id);

  const insertVehicleDestination = new VehicleDestination({
    vehicle_id: convertedVehicleId,
    post_id: convertedPostId,
    actual_location: req.body.actual_location,
    purpose: req.body.purpose,
    destination_dt: req.body.destination_dt,
  });

  const newVehicleDestination = await VehicleDestination.create(insertVehicleDestination);
  return newVehicleDestination;
};

const update = async (vehicleDesinationId, req) => {
  const updateVehicleDestination = await VehicleDestination.findByIdAndUpdate(vehicleDesinationId,
    { $set: req.body }, { new: true });
  return updateVehicleDestination;
};


const destroy = async (req) => {
  const destroyVehicleDestination = await VehicleDestination.deleteById(req);
  return destroyVehicleDestination;
};

// for cascading deletes - when we delete a vehicle we need to delete the sub documents
const deleteByVehicleId = async (req) => {
  const destroyByVehicleId = await VehicleDestination.delete({ vehicle_id: req });
  return destroyByVehicleId;
};


module.exports = {
  fetch,
  post,
  findById,
  update,
  destroy,
  deleteByVehicleId,
};
