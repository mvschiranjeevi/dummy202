const mongoose = require("mongoose");

const classSchmena = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  image: { type: String, required: true },
  schedule: { type: Array, required: true },
});

const classes = mongoose.model("class", classSchmena);

module.exports = classes;
