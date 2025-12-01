const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccessToken = (user) => jwt.sign(
  { id: user._id, role: user.role, name: user.name, isActive: user.isActive },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const createRefreshToken = (user) => jwt.sign(
  { id: user._id },
  process.env.REFRESH_SECRET,
  { expiresIn: '30d' }
);

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    if (!user.isActive) return res.status(403).json({ message: 'Compte désactivé' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // خزّن الـ refresh token في قاعدة البيانات (مقبول لعدة أجهزة)
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // أرسل الـ refresh token كـ httpOnly cookie أو في body (هنا نرجع في body)
    res.json({
      message: 'Connexion réussie',
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// CREATE USER (Admin / Doyen only) - use in routes with authorize('doyen')
exports.createUserByAdmin = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role) return res.status(400).json({ message: 'Champs manquants' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });

    const pwd = password || Math.random().toString(36).slice(-10);
    const hashed = await bcrypt.hash(pwd, 10);

    const user = await User.create({ name, email, password: hashed, role });
    // create linked docs/profiles in other collections if needed (StudentProfile/Hospital)
    res.status(201).json({ message: 'Utilisateur créé', userId: user._id, tempPassword: pwd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// REFRESH TOKEN
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token manquant' });

    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Refresh token invalide' });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });

    // تحقق أن هذا الـ refresh token موجود في DB
    const found = user.refreshTokens.find(r => r.token === refreshToken);
    if (!found) return res.status(401).json({ message: 'Refresh token non reconnu' });

    const accessToken = createAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// LOGOUT (يسقط refresh token من DB)
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token manquant' });

    // إزالة الـ refresh token من قاعدة البيانات
    await User.updateOne(
      { 'refreshTokens.token': refreshToken },
      { $pull: { refreshTokens: { token: refreshToken } } }
    );

    res.json({ message: 'Déconnecté avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
