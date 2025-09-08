 
// src/controllers/flightController.js
const Flight = require("../models/flight");

// Search flights
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, departDate, tripType, adults, children, class: classType } = req.query;

    if (!from || !to || !departDate) {
      return res.status(400).json({ success: false, message: "Missing required query parameters" });
    }

    const flights = await Flight.search({ from, to, departDate, tripType, adults, children, classType });

    res.json({
      success: true,
      tripType: tripType || "oneway",
      flights: flights.map(f => ({
        flightId: f.flight_id,
        flightNumber: f.flight_number,
        airline: f.airline,
        from: f.from_airport,
        to: f.to_airport,
        departure: f.departure_time,
        arrival: f.arrival_time,
        duration: calculateDuration(f.departure_time, f.arrival_time),
        price: f.base_price,
        availableSeats: f.available_seats,
        class: classType || "economy"
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get flight details
exports.getFlightDetails = async (req, res) => {
  try {
    const flightId = req.params.id;
    const flight = await Flight.getById(flightId);

    if (!flight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }

    res.json({
      success: true,
      flight
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Book a flight
exports.bookFlight = async (req, res) => {
  try {
    const { userId, flightId, journeyDate, class: travelClass, totalFare, bookingReference } = req.body;

    if (!userId || !flightId || !journeyDate || !travelClass || !totalFare || !bookingReference) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const booking = await Flight.book({ userId, flightId, journeyDate, travelClass, totalFare, bookingReference });

    res.json({
      success: true,
      bookingReference,
      totalAmount: totalFare,
      bookingId: booking.bookingId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Helper function to calculate duration
function calculateDuration(departure, arrival) {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const diffMs = arr - dep;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}
