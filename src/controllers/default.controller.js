const express = require('express');
const defaultService = require('./../services/default.service');

const router = express.Router();

router.get('/', defaultService.get);

module.exports = router;
