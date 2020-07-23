/* eslint-disable no-underscore-dangle */
import logger from '../configs/winston.config';
import vehicleDB from '../db/vehicle.database';

// not calling this from an API so I've created a new folder to manage
// workflow functions. this particular function will take the contract id, contract line id,
// and quantity and then generate X number of vehicles automatically

const createVehicleFromContract = async (req, contractNumber, clin, index) => {
  try {
    const contractId = req.contract_id;
    const contractLineId = req._id;

    // build the customer vehicle number
    const customerVehicleNumber = `${contractNumber}-${clin}-${index}`;

    const newVehicle = await vehicleDB.createVehicleFromContract(
      contractId,
      contractLineId,
      customerVehicleNumber,
      req,
    );
    // logger.info(`from the function call ${newVehicle}`);
    if (newVehicle) {
      logger.info(`A new vehicle was created dynamically ${newVehicle._id}`);
    }
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
  }
};


module.exports = {
  createVehicleFromContract,
};
