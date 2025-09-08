// src/routes/flightRoutes.js
const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

// Search flights
router.get("/search", flightController.searchFlights);

// Get flight details by ID
router.get("/:id", flightController.getFlightDetails);

// Book a flight (requires authentication)
router.post("/book", flightController.bookFlight);

module.exports = router;
