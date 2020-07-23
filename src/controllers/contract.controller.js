const express = require('express');
const contractService = require('./../services/contract.service');

const router = express.Router();

router.get('/', contractService.getContracts);
router.post('/', contractService.createContract);
router.get('/:id', contractService.getContractById);
router.put('/:id', contractService.updateContract);
router.delete('/:id', contractService.deleteContract);

module.exports = router;
