// src/app.js
const express = require("express");
const bodyParser = require("body-parser");

// Routes
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require('./routes/bookingRoutes');

const paymentRoutes = require('./routes/paymentRoutes');
const airportRoutes = require('./routes/airportRoutes');
const cityRoutes = require('./routes/cityRoutes');



const app = express();
app.use(bodyParser.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/packages", packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/cities', cityRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🛫 Travel Booking Backend API is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
