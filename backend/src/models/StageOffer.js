const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  title: { type: String, required: true },
  description: String,
  durationWeeks: Number,
  startDate: Date,
  places: Number,
  status: { type: String, enum: ['published','closed','draft'], default: 'published' }
}, { timestamps: true });

offerSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('StageOffer', offerSchema);
