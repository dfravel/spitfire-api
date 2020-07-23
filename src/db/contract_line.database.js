import ContractLine from '../models/contract_line.model';

const mongoose = require('mongoose');


const fetch = async (req) => {
  const contractLines = await ContractLine.find({ contract_id: req });
  //   logger.info(`the output is ${contractLines}`);
  return contractLines;
};

const findById = async (req) => {
  const findContractLine = await ContractLine.findById(req);
  return findContractLine;
};

const post = async (contractId, req) => {
  const convertedContractId = mongoose.Types.ObjectId(contractId);
  //   logger.info(`the converted contract id is ${convertedContractId}`);

  const insertContractLine = new ContractLine({
    contract_id: convertedContractId,
    quantity: req.body.quantity,
    clin: req.body.clin,
    make: req.body.make,
    model: req.body.model,
    model_year: req.body.model_year,
    armor_level: req.body.armor_level,
    vehicle_type: req.body.vehicle_type,
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
  });

  const newContractLine = await ContractLine.create(insertContractLine);
  return newContractLine;
};

const update = async (contractLineId, req) => {
  const updateContractLine = await ContractLine.findByIdAndUpdate(contractLineId,
    { $set: req.body }, { new: true });
  return updateContractLine;
};


const destroy = async (req) => {
  const destroyContractLine = await ContractLine.deleteById(req);
  return destroyContractLine;
};

const deleteByContractId = async (req) => {
  const destroyByContractId = await ContractLine.delete({ contract_id: req });
  return destroyByContractId;
};

const addVehicle = async (contractLineId, vehicleId) => {
  const updateVehicle = await ContractLine.findOneAndUpdate(
    { _id: contractLineId },
    { $push: { vehicles: vehicleId } },
    { new: true },
  );
  return updateVehicle;
};

const deleteVehicle = async (contractLineId, vehicleId) => {
  const updateVehicle = await ContractLine.findOneAndUpdate(
    { _id: contractLineId },
    { $pull: { vehicles: vehicleId } },
    { new: true },
  );
  return updateVehicle;
};


module.exports = {
  fetch,
  findById,
  post,
  update,
  destroy,
  deleteByContractId,
  addVehicle,
  deleteVehicle,
};
