const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  address: String,
  contacts: { phone: String, email: String },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
