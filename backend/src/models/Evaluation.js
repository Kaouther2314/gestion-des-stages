const mongoose = require('mongoose');

const evalSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true, unique: true },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scores: {
    competencies: { type: Number, min: 0, max: 5 },
    attendance: { type: Number, min: 0, max: 5 },
    behavior: { type: Number, min: 0, max: 5 }
  },
  comment: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evalSchema);
