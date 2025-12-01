// Backend API - exemple avec Express.js
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Vérifier dans quelle table se trouve l'email
    let user = null;
    let userType = null;
    
    // Chercher dans la table Admin
    user = await Admin.findOne({ where: { email } });
    if (user) userType = 'admin';
    
    // Si non trouvé, chercher dans Hospital
    if (!user) {
      user = await Hospital.findOne({ where: { email } });
      if (user) userType = 'hospital';
    }
    
    // Si non trouvé, chercher dans Student
    if (!user) {
      user = await Student.findOne({ where: { email } });
      if (user) userType = 'student';
    }
    
    // Si non trouvé, chercher dans Doctor
    if (!user) {
      user = await Doctor.findOne({ where: { email } });
      if (user) userType = 'doctor';
    }
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    
    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, type: userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      userType,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});