const mongoose = require("mongoose");

const userclassSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, required: true },
  schedule: { type: Array, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  isDeleted: { type: Boolean, required: true },
});

const Schedule = mongoose.model("userSchedule", userclassSchema);

module.exports = Schedule;
