const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth'); // JWT authentication middleware

// All routes require authentication
router.use(auth);

// Get all bookings for the logged-in user
router.get('/', bookingController.getAllBookings);

// Get specific booking by type and ID
router.get('/:type/:bookingId', bookingController.getBookingById);

// Cancel a booking
router.post('/:type/:bookingId/cancel', bookingController.cancelBooking);

module.exports = router;
