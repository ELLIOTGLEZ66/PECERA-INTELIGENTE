// routers/sensor.js

const express = require('express');
const sensorController = require('../controllers/sensorController');

const router = express.Router();

// Obtener los últimos datos de los sensores
router.get('/latest', sensorController.getLatestData); 

// Obtener todos los datos históricos de los sensores  
router.get('/history', sensorController.getHistoricalData);

module.exports = router;