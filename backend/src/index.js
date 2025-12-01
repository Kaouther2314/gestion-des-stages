// server.js
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// ✅ متغيرات البيئة
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ✅ اتصال بقاعدة البيانات (MongoDB)
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 Serveur backend lancé !`);
      console.log(`🌍 Environnement : ${NODE_ENV}`);
      console.log(`🔗 Port : ${PORT}`);
      console.log(`🗄️  Base de données : connectée avec succès`);
      console.log(`💡 Accédez à http://localhost:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
    process.exit(1); // يوقف السيرفر إن فشل الاتصال
  });

// ✅ في حالة حدوث خطأ غير متوقع
process.on('unhandledRejection', (err) => {
  console.error('💥 Erreur non gérée :', err);
  process.exit(1);
});
