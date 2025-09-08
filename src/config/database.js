 
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// point to your SQLite DB file
const dbPath = path.join(__dirname, "../../database/travelBooking.db");

// open DB connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

module.exports = db;
