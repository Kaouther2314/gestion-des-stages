const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/user');
require('dotenv').config(); 

async function createAdmin() {
  try {
    // الاتصال بقاعدة البيانات
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // بيانات الأدمين
    const name = 'Abdou';
    const email = 'abdou@gmail.com';
    const passwordPlain = '123456';
    const role = 'doyen'; 

    // تشفير الباسوورد
    const passwordHashed = await bcrypt.hash(passwordPlain, 10);

    // إنشاء المستخدم
    const admin = new User({
      name,
      email: email.toLowerCase(),
      password: passwordHashed,
      role,
      isActive: true,
      refreshTokens: [],
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log(`Email: ${email}`);
    console.log(`Password: ${passwordPlain}`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  }
}

createAdmin();
