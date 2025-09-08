 
// src/routes/hotelRoutes.js
const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

// Search hotels
router.get("/search", hotelController.searchHotels);

// Get hotel details by ID
router.get("/:id", hotelController.getHotelById);

// Book a hotel
router.post("/book", hotelController.bookHotel);

module.exports = router;
