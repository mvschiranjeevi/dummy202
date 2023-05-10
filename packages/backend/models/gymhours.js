const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymVisitSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  durationHours: {
    type: Number,
    required: true
  }
});


const GymVisit = mongoose.model('GymVisit', gymVisitSchema);

