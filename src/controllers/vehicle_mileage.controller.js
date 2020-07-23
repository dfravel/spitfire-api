const express = require('express');
const vehicleMileageService = require('./../services/vehicle_mileage.service');

const router = express.Router();

router.get('/:vehicle_id', vehicleMileageService.getVehicleMileage);
router.post('/:vehicle_id', vehicleMileageService.createVehicleMileage);


module.exports = router;
