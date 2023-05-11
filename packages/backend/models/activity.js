const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
});

module.exports = mongoose.model('Activity', activitySchema);
