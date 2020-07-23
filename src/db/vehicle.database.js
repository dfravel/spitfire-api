import Vehicle from '../models/vehicle.model';
import logger from '../configs/winston.config';

const mongoose = require('mongoose');

const fetch = async () => {
  const vehicles = await Vehicle.find({}).populate('shipping')
    .populate('destinations')
    .populate('inspections')
    .populate('maintenance')
    .populate('post_id')
    .populate('attachments')
    .populate({
      path: 'contract_id',
      populate: { path: 'vendor' },
    })
    .populate('contract_line_id');
  return vehicles;
};

const fetchByVehicleId = async (req) => {
//   logger.info(`the vehicle id is ${req}`);
  const vehicle = await Vehicle.findById(req)
    .populate('shipping')
    .populate('destinations')
    .populate('inspections')
    .populate('maintenance')
    .populate('attachments')
    .populate('post_id')
    .populate({
      path: 'contract_id',
      populate: { path: 'vendor' },
    })
    .populate('contract_line_id');
  return vehicle;
};

const fetchForMap = async () => {
  //   logger.info(`the vehicle id is ${req}`);
  const vehicles = await Vehicle.find({}).select('-_id make model model_year status')
    .populate('post_id', ['name', 'location']);
  return vehicles;
};

const fetchByContractId = async (req) => {
  const vehicles = await Vehicle.find({ contract_id: req })
    .populate('shipping')
    .populate('destinations')
    .populate('inspections')
    .populate('maintenance');
  return vehicles;
};


const fetchMileageByVehicleId = async (req) => {
  //  logger.info(`the incoming vehicle id is ${req}`);
  const vehicleMileage = await Vehicle.findById(req).select('-_id customer_vehicle_number vin mileage');
  //   logger.info(`the outgoing data is ${vehicleMileage}`);
  return vehicleMileage;
};

const post = async (contractId, contractLineId, req) => {
  const convertedContractId = mongoose.Types.ObjectId(contractId);
  const convertedContractLineId = mongoose.Types.ObjectId(contractLineId);

  const vehicle = new Vehicle({
    contract_id: convertedContractId,
    contract_line_id: convertedContractLineId,
    vin: req.body.vin,
    contract_received_dt: req.body.contract_received_dt,
    build_start_dt: req.body.build_start_dt,
    status: req.body.status,
    armor_level: req.body.armor_level,
    vehicle_type: req.body.vehicle_type,
    make: req.body.make,
    model: req.body.model,
    model_year: req.body.model_year,
    trim_package: req.body.trim_package,
    airbag_config: req.body.airbag_config,
    curb_weight: req.body.curb_weight,
    gross_weight: req.body.gross_weight,
    exterior_color: req.body.exterior_color,
    interior_color: req.body.interior_color,
    number_of_doors: req.body.number_of_doors,
    number_of_seats: req.body.number_of_seats,
    glass_tinting: req.body.glass_tinting,
    engine_size: req.body.engine_size,
    tactical_package: req.body.tactical_package,
    audio_package: req.body.audio_package,
    abs: req.body.abs,
    spare_parts_kits: req.body.spare_parts_kits,
    transmission: req.body.transmission,
    drive_type: req.body.drive_type,
    drive_side: req.body.drive_side,
    fuel_type: req.body.fuel_type,
    mileage: {
      miles: 0,
      reported_dt: Date.now(),
    },
  });

  const newVehicle = await Vehicle.create(vehicle);
  return newVehicle;
};


const createVehicleFromContract = async (
  contractId,
  contractLineId,
  customerVehicleNumber,
  req) => {
  const convertedContractId = mongoose.Types.ObjectId(contractId);
  const convertedContractLineId = mongoose.Types.ObjectId(contractLineId);

  const vehicle = new Vehicle({
    contract_id: convertedContractId,
    contract_line_id: convertedContractLineId,
    vin: req.vin,
    customer_vehicle_number: customerVehicleNumber,
    contract_received_dt: req.contract_received_dt,
    build_start_dt: req.build_start_dt,
    status: req.status,
    armor_level: req.armor_level,
    vehicle_type: req.vehicle_type,
    make: req.make,
    model: req.model,
    model_year: req.model_year,
    trim_package: req.trim_package,
    airbag_config: req.airbag_config,
    curb_weight: req.curb_weight,
    gross_weight: req.gross_weight,
    exterior_color: req.exterior_color,
    interior_color: req.interior_color,
    number_of_doors: req.number_of_doors,
    number_of_seats: req.number_of_seats,
    glass_tinting: req.glass_tinting,
    engine_size: req.engine_size,
    tactical_package: req.tactical_package,
    audio_package: req.audio_package,
    abs: req.abs,
    spare_parts_kits: req.spare_parts_kits,
    transmission: req.transmission,
    drive_type: req.drive_type,
    drive_side: req.drive_side,
    fuel_type: req.fuel_type,
    mileage: {
      miles: 0,
      reported_dt: Date.now(),
    },
  });

  const newVehicle = await Vehicle.create(vehicle);
  return newVehicle;
};


const update = async (vehicleId, req) => {
  const updateVehicle = await Vehicle.findByIdAndUpdate(vehicleId,
    { $set: req.body }, { new: true });


  return updateVehicle;
};

const destroy = async (req) => {
  const destroyVehicle = await Vehicle.deleteById(req);
  return destroyVehicle;
};


const postMileageById = async (vehicleId, req) => {
  const addMileage = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    {
      $push: {
        mileage: {
          miles: req.body.miles,
          reported_dt: req.body.reported_dt || Date.now(),
        },
      },
    },
    { new: true },
  );
  return addMileage;
};

// manage shipping sub records
const addShipping = async (vehicleId, vehicleShippingId) => {
  const updateShipping = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $push: { shipping: vehicleShippingId } },
    { new: true },
  );
  return updateShipping;
};

const deleteShipping = async (vehicleId, vehicleShippingId) => {
  const updateVehicle = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $pull: { shipping: vehicleShippingId } },
    { new: true },
  );
  return updateVehicle;
};
// end shipping sub records


// manage destination sub records
const addDestination = async (vehicleId, vehicleDestinationId) => {
  const updateDestination = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $push: { destinations: vehicleDestinationId } },
    { new: true },
  );
  return updateDestination;
};

const deleteDestination = async (vehicleId, vehicleDestinationId) => {
  const updateVehicle = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $pull: { destinations: vehicleDestinationId } },
    { new: true },
  );
  return updateVehicle;
};
// end destination sub records


// manage inspection sub records
const addInspection = async (vehicleId, vehicleInspectionId) => {
  const updateInspection = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $push: { inspections: vehicleInspectionId } },
    { new: true },
  );
  return updateInspection;
};

const deleteInspection = async (vehicleId, vehicleInspectionId) => {
  const updateVehicle = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $pull: { inspections: vehicleInspectionId } },
    { new: true },
  );
  return updateVehicle;
};
  // end inspection sub records

// manage maintenance sub records
const addMaintenance = async (vehicleId, vehicleMaintenanceId) => {
  const updateMaintenance = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $push: { maintenance: vehicleMaintenanceId } },
    { new: true },
  );
  return updateMaintenance;
};

const deleteMaintenance = async (vehicleId, vehicleMaintenanceId) => {
  const updateVehicle = await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    { $pull: { inspections: vehicleMaintenanceId } },
    { new: true },
  );
  return updateVehicle;
};
// end maintenance sub records


module.exports = {
  fetch,
  fetchByVehicleId,
  fetchByContractId,
  fetchMileageByVehicleId,
  fetchForMap,
  post,
  createVehicleFromContract,
  update,
  destroy,
  postMileageById,
  addShipping,
  deleteShipping,
  addDestination,
  deleteDestination,
  addInspection,
  deleteInspection,
  addMaintenance,
  deleteMaintenance,
};
