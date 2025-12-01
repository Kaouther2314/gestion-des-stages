const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  filename: String,
  path: String,
  mimeType: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', docSchema);
