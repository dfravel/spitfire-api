import VehicleShipping from '../models/vehicle_shipping.model';

const mongoose = require('mongoose');


const fetch = async (req) => {
  const shipping = await VehicleShipping.find({ vehicle_id: req });
  return shipping;
};

const findById = async (req) => {
  const findVehicleShipping = await VehicleShipping.findById(req);
  return findVehicleShipping;
};

const post = async (vehicleId, req) => {
  const convertedVehicleId = mongoose.Types.ObjectId(vehicleId);

  const insertVehicleShipping = new VehicleShipping({
    vehicle_id: convertedVehicleId,
    shipment_method: req.body.shipment_method,
    destination_city: req.body.destination_city,
    destination_country: req.body.destination_country,
    carrier_vessel: req.body.carrier_vessel,
    container_number: req.body.container_number,
    pickup_address: req.body.pickup_address,
    consignor_sponsor: req.body.consignor_sponsor,
    delivery_address: req.body.delivery_address,
    consignee_contact_info: req.body.consignee_contact_info,
    movement_type: req.body.movement_type,
    special_instructions: req.body.special_instructions,
    number_of_pallets: req.body.number_of_pallets,
    pallet_size_dimensions: req.body.pallet_size_dimensions,
    planned_ship_dt: req.body.planned_ship_dt,
    planned_arrival_dt: req.body.planned_arrival_dt,
    customs_status: req.body.customs_status,

  });

  const newVehicleShipping = await VehicleShipping.create(insertVehicleShipping);
  return newVehicleShipping;
};

const update = async (vehicleShippingId, req) => {
  const updateVehicleShipping = await VehicleShipping.findByIdAndUpdate(vehicleShippingId,
    { $set: req.body }, { new: true });
  return updateVehicleShipping;
};


const destroy = async (req) => {
  const destroyVehicleShopping = await VehicleShipping.deleteById(req);
  return destroyVehicleShopping;
};

// for cascading deletes - when we delete a vehicle we need to delete the sub documents
const deleteByVehicleId = async (req) => {
  const destroyByVehicleId = await VehicleShipping.delete({ vehicle_id: req });
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
