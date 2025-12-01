// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_db';
  try {
    await mongoose.connect(uri, {
      // لا ترسل خيارات قديمة؛ driver الحديث لا يحتاج useNewUrlParser أو useUnifiedTopology
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
