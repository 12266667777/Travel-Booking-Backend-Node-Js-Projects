const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth'); // Protect payments API

// Initiate payment
router.post('/initiate', auth, paymentController.initiatePayment);

module.exports = router;
