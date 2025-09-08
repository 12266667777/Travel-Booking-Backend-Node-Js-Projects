 
// src/routes/packageRoutes.js
const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

// GET /api/packages/search
router.get("/search", packageController.searchPackages);

// GET /api/packages/:id
router.get("/:id", packageController.getPackageById);

// POST /api/packages/book
router.post("/book", packageController.bookPackage);

module.exports = router;
