const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Get popular cities
router.get('/', cityController.getCities);

module.exports = router;
