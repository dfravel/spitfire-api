const express = require('express');
const vendorService = require('./../services/vendor.service');

const router = express.Router();

router.get('/', vendorService.getVendors);
router.get('/:id', vendorService.getVendorById);
router.post('/', vendorService.createVendor);
router.put('/:id', vendorService.updateVendor);
router.delete('/:id', vendorService.deleteVendor);

module.exports = router;
