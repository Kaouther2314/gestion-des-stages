require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// --------- Middlewares globaux ---------
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// limite les requêtes abusives
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
}));

// --------- Importation des routes ---------
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes'); // 🔥 remplacera adminRoutes

// --------- Enregistrement des routes ---------
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes); // 👈 route du Doyen / Administration

// --------- Fichiers statiques ---------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --------- Test route ---------
app.get('/', (req, res) => {
  res.send('🚀 Backend API fonctionne parfaitement (version sécurisée avec rôles) !');
});

// --------- Gestion des erreurs ---------
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur interne',
  });
});

module.exports = app;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hospital Stages API',
    version: '1.0.0',
    description: 'API documentation for Hospital Stages Management'
  },
  servers: [
    { url: `http://localhost:${process.env.PORT || 4000}`, description: 'Local server' }
  ],
};

const options = {
  swaggerDefinition,
  // هنا المسار إلى ملفاتك التي تحتوي التعليقات @openapi إذا أردت
  apis: ['./src/routes/*.js', './src/controllers/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

// serve swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
