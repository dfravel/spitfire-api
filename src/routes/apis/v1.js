const express = require('express');

const defaultController = require('./../../controllers/default.controller');
const vehicleController = require('./../../controllers/vehicle.controller');
const vehicleContractController = require('./../../controllers/vehicle_contract.controller');
const vendorController = require('./../../controllers/vendor.controller');
const contractController = require('./../../controllers/contract.controller');
const postController = require('./../../controllers/post.controller');
const contractLineController = require('./../../controllers/contract_line.controller');
const vehicleShippingController = require('./../../controllers/vehicle_shipping.controller');
const vehicleDestinationController = require('./../../controllers/vehicle_destination.controller');
const vehicleInspectionController = require('./../../controllers/vehicle_inspection.controller');
const vehicleMaintenanceController = require('./../../controllers/vehicle_maintenance.controller');
const vehicleMileageController = require('./../../controllers/vehicle_mileage.controller');
const mapController = require('./../../controllers/map.controller');
const attachmentController = require('./../../controllers/attachment.controller');

const router = express.Router();

router.use('/', defaultController);

// primary routes
router.use('/vehicles', vehicleController);
router.use('/vehicles/contract', vehicleContractController);
router.use('/vendors', vendorController);
router.use('/contracts', contractController);
router.use('/posts', postController);
router.use('/maps', mapController);
router.use('/uploads', attachmentController);


// secondary routes
router.use('/contract/lines', contractLineController);
router.use('/vehicle/shipping', vehicleShippingController);
router.use('/vehicle/destinations', vehicleDestinationController);
router.use('/vehicle/inspections', vehicleInspectionController);
router.use('/vehicle/maintenance', vehicleMaintenanceController);
router.use('/vehicle/mileage', vehicleMileageController);


module.exports = router;
