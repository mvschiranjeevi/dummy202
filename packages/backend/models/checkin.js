const mongoose = require("mongoose");

const checkinSchmena = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkinTime: { type: String },
  checkoutTime: { type: String },
  date: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  isCompleted: { type: Boolean, required: true },
});

const Checkin = mongoose.model("checkin", checkinSchmena);

module.exports = Checkin;
