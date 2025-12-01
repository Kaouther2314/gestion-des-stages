const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader || (!authHeader.startsWith && !authHeader.startsWith?.('Bearer '))) {
      if (!authHeader) return res.status(401).json({ message: 'Token non fourni' });
    }

    let token;
    if (typeof authHeader === 'string') {
      token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    } else {
      token = authHeader; // fallback
    }

    if (!token) return res.status(401).json({ message: 'Token non fourni' });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    // جلب آخر بيانات المستخدم من DB (حتى إذا تغيّر isActive أو role بعد إصدار التوكن)
    const user = await User.findById(payload.id).select('-password').lean();
    if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });
    if (user.isActive === false) return res.status(403).json({ message: 'Compte désactivé' });

    // attach user object to request
    req.user = user;

    // إضافة هذا السطر لجعل req.user.id متاح للاستخدام في Controllers
    req.user.id = req.user._id.toString();

    next();
  } catch (err) {
    console.error('authMiddleware error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
