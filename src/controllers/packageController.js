 
// src/controllers/packageController.js
const packageModel = require("../models/packageModel");

// Search holiday packages
const searchPackages = (req, res) => {
  const filters = {
    destination: req.query.destination,
    duration: req.query.duration,
    minBudget: req.query.minBudget,
    maxBudget: req.query.maxBudget,
  };

  packageModel.searchPackages(filters, (err, packages) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, packages });
  });
};

// Get package details by ID
const getPackageById = (req, res) => {
  const packageId = req.params.id;
  packageModel.getPackageById(packageId, (err, pkg) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    res.json({ success: true, package: pkg });
  });
};

// Book a package
const bookPackage = (req, res) => {
  const bookingData = {
    userId: req.body.userId, // assuming auth middleware provides userId
    packageId: req.body.packageId,
    startDate: req.body.startDate,
    travelers: req.body.travelers,
    totalCost: req.body.totalCost,
  };

  packageModel.bookPackage(bookingData, (err, booking) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, ...booking });
  });
};

module.exports = {
  searchPackages,
  getPackageById,
  bookPackage,
};
