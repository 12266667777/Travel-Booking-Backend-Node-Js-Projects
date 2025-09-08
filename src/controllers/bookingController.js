 
const Booking = require('../models/booking');

// GET /api/bookings
exports.getAllBookings = async (req, res, next) => {
    try {
        const userId = req.user.user_id; // assuming auth middleware sets req.user
        const bookings = await Booking.getAllBookingsByUser(userId);

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/bookings/:type/:bookingId
exports.getBookingById = async (req, res, next) => {
    try {
        const { type, bookingId } = req.params;
        const booking = await Booking.getBookingById(type, bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({
            success: true,
            booking
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/bookings/:type/:bookingId/cancel
exports.cancelBooking = async (req, res, next) => {
    try {
        const { type, bookingId } = req.params;
        const result = await Booking.cancelBooking(type, bookingId);

        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found or already cancelled' });
        }

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
};
