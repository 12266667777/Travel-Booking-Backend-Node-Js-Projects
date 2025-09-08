 
// src/models/hotelModel.js
const db = require("../config/database");

// Search hotels based on query
const searchHotels = (filters, callback) => {
  const {
    city,
    checkIn,
    checkOut,
    rooms = 1,
    adults,
    minPrice = 0,
    maxPrice = 1000000,
    starRating
  } = filters;

  let query = `
    SELECT h.hotel_id, h.name, h.city, h.star_rating, h.amenities, hr.room_id, hr.room_type, hr.price_per_night, hr.available_quantity
    FROM hotels h
    JOIN hotel_rooms hr ON h.hotel_id = hr.hotel_id
    WHERE h.city LIKE ? AND hr.price_per_night BETWEEN ? AND ?
  `;

  const params = [`%${city}%`, minPrice, maxPrice];

  if (starRating) {
    query += " AND h.star_rating = ?";
    params.push(starRating);
  }

  db.all(query, params, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Get hotel details by ID
const getHotelById = (hotelId, callback) => {
  const query = `
    SELECT h.hotel_id, h.name, h.city, h.star_rating, h.amenities, hr.room_id, hr.room_type, hr.price_per_night, hr.max_occupancy, hr.available_quantity, hr.amenities AS room_amenities
    FROM hotels h
    JOIN hotel_rooms hr ON h.hotel_id = hr.hotel_id
    WHERE h.hotel_id = ?
  `;
  db.all(query, [hotelId], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Book a hotel
const bookHotel = (bookingData, callback) => {
  const {
    userId,
    hotelId,
    roomId,
    checkIn,
    checkOut,
    rooms,
    totalAmount
  } = bookingData;

  const bookingReference = "HT" + Math.floor(Math.random() * 1000000);

  const query = `
    INSERT INTO hotel_bookings (user_id, hotel_id, room_id, booking_reference, check_in_date, check_out_date, rooms_booked, total_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  const params = [userId, hotelId, roomId, bookingReference, checkIn, checkOut, rooms, totalAmount];

  db.run(query, params, function(err) {
    if (err) return callback(err);
    callback(null, { bookingId: this.lastID, bookingReference, totalAmount });
  });
};

module.exports = {
  searchHotels,
  getHotelById,
  bookHotel
};
