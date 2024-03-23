const express = require("express");
const router = express.Router();
const locationController = require("../controllers/LocationController");

// Middleware to handle errors for async route handlers
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// POST request to save a location
router.post("/", asyncHandler(locationController.saveLocation));

// GET request to retrieve all locations
router.get("/", asyncHandler(locationController.getLocations));

// DELETE request to delete a location by ID
router.delete("/:id", asyncHandler(locationController.deleteLocation));

module.exports = router;
