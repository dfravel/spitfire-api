const express = require('express');
const vehicleInspectionService = require('./../services/vehicle_inspection.service');

const router = express.Router();

router.get('/:vehicle_id', vehicleInspectionService.getVehicleInspections);
router.get('/:vehicle_id/:id', vehicleInspectionService.getVehicleInspectionById);
router.post('/:vehicle_id', vehicleInspectionService.createVehicleInspection);
router.put('/:vehicle_id/:id', vehicleInspectionService.updateVehicleInspection);
router.delete('/:vehicle_id/:id', vehicleInspectionService.deleteVehicleInspection);


module.exports = router;
