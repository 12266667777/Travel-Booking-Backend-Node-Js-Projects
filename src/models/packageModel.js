// src/models/packageModel.js
const db = require("../config/database");

// Search holiday packages
const searchPackages = (filters, callback) => {
  let query = `SELECT * FROM holiday_packages WHERE 1=1`;
  const params = [];

  if (filters.destination) {
    query += ` AND destinations LIKE ?`;
    params.push(`%${filters.destination}%`);
  }

  if (filters.duration) {
    query += ` AND duration_days = ?`;
    params.push(filters.duration);
  }

  if (filters.minBudget) {
    query += ` AND price_per_person >= ?`;
    params.push(filters.minBudget);
  }

  if (filters.maxBudget) {
    query += ` AND price_per_person <= ?`;
    params.push(filters.maxBudget);
  }

  db.all(query, params, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Get package details by ID
const getPackageById = (packageId, callback) => {
  const query = `SELECT * FROM holiday_packages WHERE package_id = ?`;
  db.get(query, [packageId], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

// Book a holiday package
const bookPackage = (bookingData, callback) => {
  const { userId, packageId, startDate, travelers, totalCost } = bookingData;
  const bookingReference = `PKG${Date.now()}`;

  const query = `
    INSERT INTO package_bookings (user_id, package_id, booking_reference, start_date, travelers, total_cost)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [userId, packageId, bookingReference, startDate, travelers, totalCost];

  db.run(query, params, function (err) {
    if (err) return callback(err);
    callback(null, {
      bookingId: this.lastID,
      bookingReference,
      totalAmount: totalCost
    });
  });
};

module.exports = {
  searchPackages,
  getPackageById,
  bookPackage
};
