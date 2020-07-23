const express = require('express');
const vehicleShippingService = require('./../services/vehicle_shipping.service');

const router = express.Router();

router.get('/:vehicle_id', vehicleShippingService.getVehicleShipping);
router.get('/:vehicle_id/:id', vehicleShippingService.getVehicleShippingById);
router.post('/:vehicle_id', vehicleShippingService.createVehicleShipping);
router.put('/:vehicle_id/:id', vehicleShippingService.updateVehicleShipping);
router.delete('/:vehicle_id/:id', vehicleShippingService.deleteVehicleShipping);


module.exports = router;
