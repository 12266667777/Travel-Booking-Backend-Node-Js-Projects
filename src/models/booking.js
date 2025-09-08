 
// src/models/booking.js
const db = require('../config/database');

class Booking {
    // Get all bookings for a user
    static async getAllBookingsByUser(userId) {
        try {
            const flightsQuery = `SELECT fb.booking_id, fb.booking_reference, fb.journey_date, fb.travel_class, fb.total_fare, fb.status,
                                         f.flight_number, f.departure_time, f.arrival_time, a1.code AS source, a2.code AS destination
                                  FROM flight_bookings fb
                                  JOIN flights f ON fb.flight_id = f.flight_id
                                  JOIN airports a1 ON f.source_airport = a1.airport_id
                                  JOIN airports a2 ON f.destination_airport = a2.airport_id
                                  WHERE fb.user_id = ?`;

            const hotelsQuery = `SELECT hb.booking_id, hb.booking_reference, hb.check_in_date, hb.check_out_date, hb.rooms_booked, hb.total_amount, hb.status,
                                        h.name AS hotel_name, hr.room_type
                                 FROM hotel_bookings hb
                                 JOIN hotels h ON hb.hotel_id = h.hotel_id
                                 JOIN hotel_rooms hr ON hb.room_id = hr.room_id
                                 WHERE hb.user_id = ?`;

            const packagesQuery = `SELECT pb.booking_id, pb.booking_reference, pb.start_date, pb.travelers, pb.total_cost, pb.status,
                                         hp.name AS package_name, hp.duration_days, hp.duration_nights
                                  FROM package_bookings pb
                                  JOIN holiday_packages hp ON pb.package_id = hp.package_id
                                  WHERE pb.user_id = ?`;

            const flights = await db.all(flightsQuery, [userId]);
            const hotels = await db.all(hotelsQuery, [userId]);
            const packages = await db.all(packagesQuery, [userId]);

            return { flights, hotels, packages };
        } catch (error) {
            throw error;
        }
    }

    // Get specific booking details
    static async getBookingById(type, bookingId) {
        try {
            let query = '';
            switch(type) {
                case 'flight':
                    query = `SELECT fb.*, f.flight_number, f.departure_time, f.arrival_time
                             FROM flight_bookings fb
                             JOIN flights f ON fb.flight_id = f.flight_id
                             WHERE fb.booking_id = ?`;
                    break;
                case 'hotel':
                    query = `SELECT hb.*, h.name AS hotel_name, hr.room_type
                             FROM hotel_bookings hb
                             JOIN hotels h ON hb.hotel_id = h.hotel_id
                             JOIN hotel_rooms hr ON hb.room_id = hr.room_id
                             WHERE hb.booking_id = ?`;
                    break;
                case 'package':
                    query = `SELECT pb.*, hp.name AS package_name, hp.duration_days, hp.duration_nights
                             FROM package_bookings pb
                             JOIN holiday_packages hp ON pb.package_id = hp.package_id
                             WHERE pb.booking_id = ?`;
                    break;
                default:
                    throw new Error('Invalid booking type');
            }

            const booking = await db.get(query, [bookingId]);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    // Cancel a booking
    static async cancelBooking(type, bookingId) {
        try {
            let table = '';
            switch(type) {
                case 'flight':
                    table = 'flight_bookings';
                    break;
                case 'hotel':
                    table = 'hotel_bookings';
                    break;
                case 'package':
                    table = 'package_bookings';
                    break;
                default:
                    throw new Error('Invalid booking type');
            }

            const result = await db.run(
                `UPDATE ${table} SET status = 'cancelled' WHERE booking_id = ?`,
                [bookingId]
            );

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Booking;
