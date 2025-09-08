const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController');

// Get airports with optional search
router.get('/', airportController.getAirports);

module.exports = router;
