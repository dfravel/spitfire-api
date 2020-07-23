/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import contractLineDB from '../db/contract_line.database';
import contractDB from '../db/contract.database';
import createVehicleFN from '../functions/create_vehicle_from_contract';

const getContractLines = async (req, res) => {
  try {
    // all contract lines are filtered by the contract
    const contractID = req.params.contract_id;

    const contractLines = await contractLineDB.fetch(contractID);

    if (contractLines.length > 0) {
      return res.status(200).json({
        message: 'Contract Lines fetched successfully',
        count: contractLines.length,
        data: contractLines,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No contract lines found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);

    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getContractLineById = async (req, res) => {
  try {
    const contractLine = await contractLineDB.findById(req.params.id);
    if (contractLine) {
      return res.status(200).json({
        message: `contract line with id ${req.params.id} fetched successfully`,
        data: contractLine,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No contract line found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};

const createContractLine = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const newContractLine = await contractLineDB.post(contractId, req);

    if (newContractLine) {
      // write this back to the contract array
      await contractDB.addContractLine(contractId, newContractLine._id);

      //   required elements for the auto-insert
      const contract = await contractDB.findById(contractId);
      //   logger.info(`the contract is ${contractId}`);
      //   logger.info(`the new contract line id is ${newContractLine._id}`);
      const contractNumber = contract.contract_number || 'MISSING-CONTRACT-NUMBER';
      const clin = newContractLine.clin || 'MISSING-CLIN';
      const qty = newContractLine.quantity || 1;

      //   dynamically creating a vehicle based on this contract
      for (let idx = 1; idx <= qty; idx++) {
        // eslint-disable-next-line no-await-in-loop
        await createVehicleFN.createVehicleFromContract(newContractLine, contractNumber, clin, idx);
      }
      return res.status(201).json({
        message: 'new contract line created successfully',
        data: [newContractLine],
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

const updateContractLine = async (req, res) => {
  try {
    const contractLineExists = await contractLineDB.findById(req.params.id);

    if (contractLineExists) {
      const updatedContractLine = await contractLineDB.update(req.params.id, req);

      if (updatedContractLine) {
        return res.status(201).json({
          message: 'contract line updated successfully',
          data: updatedContractLine,
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


const deleteContractLine = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const contract = await contractLineDB.destroy(req.params.id);
    if (contract) {
      await contractDB.deleteContractLine(contractId, req.params.id);
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
  getContractLines,
  getContractLineById,
  createContractLine,
  updateContractLine,
  deleteContractLine,
};
