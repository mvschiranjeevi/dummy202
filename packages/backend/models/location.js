const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  address: { type: String, required: true },
});

const Location = mongoose.model("location", locationSchema);

module.exports = { Location };
