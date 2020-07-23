const express = require('express');
const vehicleDestinationService = require('./../services/vehicle_destination.service');

const router = express.Router();

router.get('/:vehicle_id', vehicleDestinationService.getVehicleDestinations);
router.get('/:vehicle_id/:id', vehicleDestinationService.getVehicleDestinationById);
router.post('/:vehicle_id', vehicleDestinationService.createVehicleDestination);
router.put('/:vehicle_id/:id', vehicleDestinationService.updateVehicleDestination);
router.delete('/:vehicle_id/:id', vehicleDestinationService.deleteVehicleDestination);


module.exports = router;
