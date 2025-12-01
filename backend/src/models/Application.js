const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'StageOffer', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  status: { type: String, enum: ['pending','accepted','rejected','withdrawn'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  note: String
}, { timestamps: true });

appSchema.index({ student: 1, offer: 1 }, { unique: true });

module.exports = mongoose.model('Application', appSchema);
