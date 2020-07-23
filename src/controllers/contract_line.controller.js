const express = require('express');
const contractLineService = require('./../services/contract_line.service');

const router = express.Router();

router.get('/:contract_id', contractLineService.getContractLines);
router.post('/:contract_id', contractLineService.createContractLine);
router.get('/:contract_id/:id', contractLineService.getContractLineById);
router.put('/:contract_id/:id', contractLineService.updateContractLine);
router.delete('/:contract_id/:id', contractLineService.deleteContractLine);

module.exports = router;
