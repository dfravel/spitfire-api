import vendorDB from '../db/vendor.database';
import logger from '../configs/winston.config';

const getVendors = async (req, res) => {
  try {
    const vendors = await vendorDB.fetch();

    if (vendors.length > 0) {
      return res.status(200).json({
        message: 'Vendors fetched successfully',
        count: vendors.length,
        data: vendors,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No vendors found in the system',
    });
  } catch (error) {
    //   log the error so that we can review it
    logger.info(`An error occured with this request. ${error.message}`);

    // return an error to the requestor
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await vendorDB.findById(req.params.id);
    if (vendor) {
      return res.status(200).json({
        message: `vendor with id ${req.params.id} fetched successfully`,
        data: vendor,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vendor found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};

const createVendor = async (req, res) => {
  try {
    const newVendor = await vendorDB.post(req);

    if (newVendor) {
      return res.status(201).json({
        message: 'new vendor created successfully',
        data: newVendor,
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

const updateVendor = async (req, res) => {
  try {
    const vendorExists = await vendorDB.findById(req.params.id);

    if (vendorExists) {
      const updatedVendor = await vendorDB.update(req.params.id, req);

      if (updatedVendor) {
        return res.status(201).json({
          message: 'vendor updated successfully',
          data: updatedVendor,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vendor found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await vendorDB.destroy(req.params.id);
    if (vendor) {
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No vendor found in the system',
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
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};
