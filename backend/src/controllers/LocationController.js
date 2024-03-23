const Location = require("../models/Location");

// Save a new location
const saveLocation = async (req, res) => {
  const { latitude, longitude, date } = req.body;

  // Basic validation
  if (latitude == null || longitude == null) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required." });
  }

  try {
    const newLocation = await Location.create({
      latitude,
      longitude,
      date: date || new Date(),
    });
    res.status(201).json(newLocation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save the location: " + err.message });
  }
};

// Get all locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve locations: " + err.message });
  }
};

// Delete a location by ID
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found." });
    }
    res.json({ message: "Location successfully deleted.", _id: req.params.id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete the location: " + err.message });
  }
};

module.exports = {
  saveLocation,
  getLocations,
  deleteLocation,
};
