 
// src/controllers/hotelController.js
const hotelModel = require("../models/hotel");

// Search hotels
const searchHotels = (req, res) => {
  const filters = {
    city: req.query.city,
    checkIn: req.query.checkIn,
    checkOut: req.query.checkOut,
    rooms: req.query.rooms,
    adults: req.query.adults,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    starRating: req.query.starRating
  };

  hotelModel.searchHotels(filters, (err, hotels) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, hotels });
  });
};

// Get hotel details by ID
const getHotelById = (req, res) => {
  const hotelId = req.params.id;

  hotelModel.getHotelById(hotelId, (err, hotel) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!hotel || hotel.length === 0) return res.status(404).json({ success: false, message: "Hotel not found" });
    res.json({ success: true, hotel });
  });
};

// Book a hotel
const bookHotel = (req, res) => {
  const bookingData = {
    userId: req.body.userId, // ideally from authenticated user
    hotelId: req.body.hotelId,
    roomId: req.body.roomTypeId,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    rooms: req.body.rooms,
    totalAmount: req.body.totalAmount
  };

  hotelModel.bookHotel(bookingData, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, bookingReference: result.bookingReference, totalAmount: result.totalAmount, bookingId: result.bookingId });
  });
};

module.exports = {
  searchHotels,
  getHotelById,
  bookHotel
};
