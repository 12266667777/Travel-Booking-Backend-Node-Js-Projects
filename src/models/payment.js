const db = require('../config/database');

class Payment {
    static async initiatePayment({ bookingType, bookingId, paymentMethod }) {
        try {
            let query = '';
            switch (bookingType) {
                case 'flight':
                    query = `SELECT total_fare AS amount FROM flight_bookings WHERE booking_id = ?`;
                    break;
                case 'hotel':
                    query = `SELECT total_amount AS amount FROM hotel_bookings WHERE booking_id = ?`;
                    break;
                case 'package':
                    query = `SELECT total_cost AS amount FROM package_bookings WHERE booking_id = ?`;
                    break;
                default:
                    throw new Error('Invalid booking type');
            }

            // Fetch booking amount
            const booking = await db.get(query, [bookingId]);
            if (!booking) {
                throw new Error('Booking not found');
            }

            const amount = booking.amount;
            const transactionId = `TXN${Date.now()}`; // simple unique transaction ID

            // Insert into payments table
            await db.run(
                `INSERT INTO payments (booking_type, booking_id, amount, payment_method, status)
                 VALUES (?, ?, ?, ?, 'pending')`,
                [bookingType, bookingId, amount, paymentMethod]
            );

            // Mock payment gateway response
            const paymentUrl = `https://fake-payment-gateway.com/pay/${transactionId}`;

            return {
                success: true,
                transactionId,
                amount,
                paymentUrl
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Payment;
