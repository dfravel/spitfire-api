const express = require('express');
const v1ApiController = require('./v1');
const v2ApiController = require('./v2');

const router = express.Router();
router.use('/v1', v1ApiController);
router.use('/v2', v2ApiController);
module.exports = router;
