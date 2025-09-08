 
const Payment = require('../models/payment');

// POST /api/payments/initiate
exports.initiatePayment = async (req, res, next) => {
    try {
        const { bookingType, bookingId, paymentMethod } = req.body;

        if (!bookingType || !bookingId || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'bookingType, bookingId, and paymentMethod are required'
            });
        }

        const result = await Payment.initiatePayment({
            bookingType,
            bookingId,
            paymentMethod
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
