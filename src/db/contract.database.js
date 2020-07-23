import Contract from '../models/contract.model';


const fetch = async () => {
  const contracts = await Contract.find({}).populate('contract_lines').populate('vendor');
  return contracts;
};

const findById = async (req) => {
  const findContract = await Contract.findById(req).populate('contract_lines');
  return findContract;
};

const post = async (req) => {
  const contract = new Contract({
    contract_number: req.body.contract_number,
    vendor: req.body.vendor,
    number_of_vehicles: req.body.number_of_vehicles,
    status: req.body.status,
    awarded_dt: req.body.awarded_dt,
    total_contract_value: req.body.total_contract_value,
  });

  const newContract = await Contract.create(contract);
  return newContract;
};

const update = async (contractId, req) => {
  const updateContract = await Contract.findByIdAndUpdate(contractId,
    { $set: req.body }, { new: true });
  return updateContract;
};


const destroy = async (req) => {
  const destroyContract = await Contract.deleteById(req);
  return destroyContract;
};

const addContractLine = async (contractId, contractLineId) => {
  const updateContractLine = await Contract.findOneAndUpdate(
    { _id: contractId },
    { $push: { contract_lines: contractLineId } },
    { new: true },
  );
  return updateContractLine;
};

const deleteContractLine = async (contractId, contractLineId) => {
  const updateContractLine = await Contract.findOneAndUpdate(
    { _id: contractId },
    { $pull: { contract_lines: contractLineId } },
    { new: true },
  );
  return updateContractLine;
};


module.exports = {
  fetch,
  findById,
  post,
  update,
  destroy,
  addContractLine,
  deleteContractLine,
};
