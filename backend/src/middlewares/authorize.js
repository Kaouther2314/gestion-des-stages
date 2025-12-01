// middlewares/authorize.js
// Usage: authorize('doyen'), authorize('hopital','doyen'), etc.
module.exports = (...allowedRoles) => (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentification requise' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    // optional: check isActive
    if (req.user.isActive === false) return res.status(403).json({ message: 'Compte désactivé' });
    // can add isActive check (user fetched by authMiddleware already has isActive)
    next();
  } catch (err) {
    console.error('authorize error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
