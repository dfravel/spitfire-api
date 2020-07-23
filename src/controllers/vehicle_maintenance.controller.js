const express = require('express');
const vehicleMaintenanceService = require('./../services/vehicle_maintenance.service');

const router = express.Router();

router.get('/:vehicle_id', vehicleMaintenanceService.getVehicleMaintenance);
router.get('/:vehicle_id/:id', vehicleMaintenanceService.getVehicleMaintenanceById);
router.post('/:vehicle_id', vehicleMaintenanceService.createVehicleMaintenance);
router.put('/:vehicle_id/:id', vehicleMaintenanceService.updateVehicleMaintenance);
router.delete('/:vehicle_id/:id', vehicleMaintenanceService.deleteVehicleMaintenance);


module.exports = router;
