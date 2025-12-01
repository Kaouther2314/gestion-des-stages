// controllers/adminController.js
// Routes for the Doyen / Administration centrale
const bcrypt = require('bcrypt');
const path = require('path');

const User = require('../models/user');
const StudentProfile = require('../models/StudentProfile');
const Hospital = require('../models/Hospital');
const StageOffer = require('../models/StageOffer');
const Application = require('../models/Application');
const { exportToCSV, cleanupFile } = require('../utils/exportCSV');

/**
 * createUser
 * POST /api/admin/users
 * body: { name, email, role, password? }
 * only accessible to doyen (use authorize middleware)
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role) return res.status(400).json({ message: 'name, email, role sont requis' });

    const allowed = ['etudiant', 'medecin', 'hopital', 'doyen'];
    if (!allowed.includes(role)) return res.status(400).json({ message: 'Role invalide' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });

    const pwd = password || Math.random().toString(36).slice(-10);
    const hashed = await bcrypt.hash(pwd, 10);

    const user = await User.create({ name, email, password: hashed, role });

    // create related records
    if (role === 'etudiant') {
      await StudentProfile.create({ user: user._id, fullName: name, matricule: `M-${Date.now()}` });
    }
    if (role === 'hopital') {
      await Hospital.create({ user: user._id, name });
    }

    // Note: in production send temp password by email; avoid returning raw password in production responses.
    res.status(201).json({ message: 'Utilisateur créé', userId: user._id, tempPassword: pwd });
  } catch (err) {
    console.error('admin.createUser error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * updateUser
 * PUT /api/admin/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const allowed = ['name','email','role','cv','bio','isActive'];
    const updates = {};
    for (const k of allowed) if (req.body[k] !== undefined) updates[k] = req.body[k];

    if (updates.role) {
      const allowedRoles = ['etudiant','medecin','hopital','doyen'];
      if (!allowedRoles.includes(updates.role)) return res.status(400).json({ message: 'Role invalide' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json({ message: 'User updated', user });
  } catch (err) {
    console.error('admin.updateUser error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * listUsers
 * GET /api/admin/users?role=etudiant&q=search&page=1&limit=50
 */
exports.listUsers = async (req, res) => {
  try {
    const { role, q, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (q) {
      // search in name and email
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .skip((page-1)*limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();

    res.json({ users, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error('admin.listUsers error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * deleteUser (optional)
 * DELETE /api/admin/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    // Optionally: cascade delete profiles (StudentProfile/Hospital) etc.
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    console.error('admin.deleteUser error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * toggleUserActive
 * PATCH /api/admin/users/:id/toggle
 */
exports.toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: 'Etat modifié', isActive: user.isActive });
  } catch (err) {
    console.error('admin.toggleUserActive error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * getStats
 * GET /api/admin/stats
 * retourne des indicateurs utiles pour le doyen
 */
exports.getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'etudiant' });
    const totalDoctors = await User.countDocuments({ role: 'medecin' });
    const totalHospitals = await Hospital.countDocuments();
    const totalOffers = await StageOffer.countDocuments();

    // group applications by status
    const applicationsCounts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // students currently in stage (accepted)
    const studentsInStage = await Application.countDocuments({ status: 'accepted' });

    // students without accepted stage (distinct student profiles not present in accepted)
    const studentsWithAccepted = await Application.distinct('student', { status: 'accepted' });
    const studentsWithoutStageCount = await StudentProfile.countDocuments({ _id: { $nin: studentsWithAccepted } });

    // distribution per hospital (accepted)
    const perHospital = await Application.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: '$hospital', acceptedCount: { $sum: 1 } } },
      { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospital' } },
      { $unwind: { path: '$hospital', preserveNullAndEmptyArrays: true } },
      { $project: { hospitalName: '$hospital.name', acceptedCount: 1 } }
    ]);

    res.json({
      totalStudents, totalDoctors, totalHospitals, totalOffers,
      applicationsCounts, studentsInStage, studentsWithoutStageCount, perHospital
    });
  } catch (err) {
    console.error('admin.getStats error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * exportCSV
 * GET /api/admin/export?type=users|applications&status=accepted
 */
exports.exportCSV = async (req, res) => {
  try {
    const { type, status } = req.query;
    if (!type) return res.status(400).json({ message: 'query param type requis (users|applications)' });

    let data = [];
    if (type === 'users') {
      data = await User.find().select('-password').lean();
    } else if (type === 'applications') {
      const query = {};
      if (status) query.status = status;
      const apps = await Application.find(query)
        .populate('student','fullName matricule')
        .populate('offer','title startDate durationWeeks')
        .populate('hospital','name')
        .lean();

      data = apps.map(a => ({
        applicationId: a._id,
        student: a.student ? a.student.fullName : '',
        matricule: a.student ? a.student.matricule : '',
        offer: a.offer ? a.offer.title : '',
        hospital: a.hospital ? a.hospital.name : '',
        status: a.status,
        appliedAt: a.appliedAt
      }));
    } else {
      return res.status(400).json({ message: 'Type invalide' });
    }

    const { filepath, filename } = exportToCSV(data, type);
    // stream the file to client
    res.download(filepath, filename, (err) => {
      // cleanup after sending
      cleanupFile(filepath);
      if (err) console.error('exportCSV download error', err);
    });
  } catch (err) {
    console.error('admin.exportCSV error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
