const express = require('express');
const mapService = require('./../services/map.service');

const router = express.Router();

router.get('/vehicles', mapService.getVehiclesForMap);


module.exports = router;
