const express = require('express');
const vehicleContractService = require('../services/vehicle.service');

const router = express.Router();

router.get('/:contract_id', vehicleContractService.getVehiclesByContractId);
router.post('/:contract_id/:contract_line_id', vehicleContractService.createVehicleByContractId);


module.exports = router;
