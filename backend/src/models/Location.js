const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const LocationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
