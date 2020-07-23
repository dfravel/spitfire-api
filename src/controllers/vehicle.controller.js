const express = require('express');
const vehicleService = require('./../services/vehicle.service');

const router = express.Router();

router.get('/', vehicleService.getAllVehicles);
router.get('/:vehicle_id', vehicleService.getVehicleByVehicleId);
router.put('/:vehicle_id', vehicleService.updateVehicle);
router.delete('/:vehicle_id', vehicleService.deleteVehicle);

module.exports = router;
