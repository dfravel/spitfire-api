import logger from '../configs/winston.config';
import contractDB from '../db/contract.database';
import contractLineDB from '../db/contract_line.database';

const getContracts = async (req, res) => {
  try {
    // migrating database calls to the data access layer
    const contracts = await contractDB.fetch();

    if (contracts.length > 0) {
      return res.status(200).json({
        message: 'Contracts fetched successfully',
        count: contracts.length,
        data: contracts,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No contracts found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);

    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getContractById = async (req, res) => {
  try {
    const contract = await contractDB.findById(req.params.id);
    if (contract) {
      return res.status(200).json({
        message: `contract with id ${req.params.id} fetched successfully`,
        data: contract,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No contract found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const createContract = async (req, res) => {
  try {
    // migrating database calls to the data access layer
    const newContract = await contractDB.post(req);

    if (newContract) {
    //   logger.info(`the new contract information is ${newContract}`);

      return res.status(201).json({
        message: 'new contract created successfully',
        data: [newContract],
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

const updateContract = async (req, res) => {
  try {
    const contractExists = await contractDB.findById(req.params.id);

    if (contractExists) {
      const updatedContract = await contractDB.update(req.params.id, req);

      if (updatedContract) {
        return res.status(201).json({
          message: 'contract updated successfully',
          data: updatedContract,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No contract found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const deleteContract = async (req, res) => {
  try {
    const contract = await contractDB.destroy(req.params.id);
    if (contract) {
      // cascading delete
      await contractLineDB.deleteByContractId(req.params.id);
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No contract found in the system',
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
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
};
