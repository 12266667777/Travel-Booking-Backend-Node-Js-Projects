 
// src/models/flightModel.js
const db = require("../config/database");

// ==============================
// Flight Model
// ==============================
const Flight = {
  // Search flights based on filters
  search: ({ from, to, departDate, tripType, adults = 1, children = 0, classType }) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT f.flight_id, f.flight_number, a.name AS airline, sa.code AS from_airport,
               da.code AS to_airport, f.departure_time, f.arrival_time, f.base_price,
               f.available_seats, f.aircraft_type
        FROM flights f
        JOIN airlines a ON f.airline_id = a.airline_id
        JOIN airports sa ON f.source_airport = sa.airport_id
        JOIN airports da ON f.destination_airport = da.airport_id
        WHERE sa.code = ? AND da.code = ? AND DATE(f.departure_time) = ?
      `;

      db.all(query, [from, to, departDate], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  // Get flight details by ID
  getById: (flightId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT f.flight_id, f.flight_number, a.name AS airline, sa.code AS from_airport,
               da.code AS to_airport, f.departure_time, f.arrival_time, f.base_price,
               f.total_seats, f.available_seats, f.aircraft_type
        FROM flights f
        JOIN airlines a ON f.airline_id = a.airline_id
        JOIN airports sa ON f.source_airport = sa.airport_id
        JOIN airports da ON f.destination_airport = da.airport_id
        WHERE f.flight_id = ?
      `;
      db.get(query, [flightId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  // Book a flight
  book: ({ userId, flightId, journeyDate, travelClass, totalFare, bookingReference }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO flight_bookings (user_id, flight_id, booking_reference, journey_date, travel_class, total_fare)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.run(
        query,
        [userId, flightId, bookingReference, journeyDate, travelClass, totalFare],
        function (err) {
          if (err) return reject(err);
          resolve({ bookingId: this.lastID });
        }
      );
    });
  },
};

module.exports = Flight;
