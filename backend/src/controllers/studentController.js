// controllers/studentController.js
const User = require('../models/user');
const StudentProfile = require('../models/StudentProfile');
const Document = require('../models/Document');
const Application = require('../models/Application');
const fs = require('fs');
const path = require('path');

// تحديث الملف الشخصي (name, bio, faculty, year, phone)
exports.updateProfile = async (req, res) => {
  try {
    const updates = {};
    const allowed = ['name','bio']; // اسم الحقول المسموح تعديلها في User
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    // أيضاً يمكن تحديث StudentProfile إن أردت (faculty, year)
    if (req.body.faculty || req.body.year || req.body.phone) {
      await StudentProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: { faculty: req.body.faculty, year: req.body.year, phone: req.body.phone } },
        { new: true }
      );
    }

    res.json({ message: 'Profil mis à jour', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// رفع ملف (CV, relevé, attestation...) مرتبط بالـ StudentProfile
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Fichier manquant' });

    const student = await StudentProfile.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ message: 'Profil étudiant introuvable' });

    const doc = await Document.create({
      owner: student._id,
      filename: req.file.originalname,
      path: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    student.documents.push(doc._id);
    await student.save();

    res.status(201).json({ message: 'Document uploaded', doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.listDocuments = async (req, res) => {
  try {
    const student = await StudentProfile.findOne({ user: req.user.id }).populate('documents');
    if (!student) return res.status(404).json({ message: 'Profil introuvable' });
    res.json({ documents: student.documents });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document introuvable' });

    const student = await StudentProfile.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ message: 'Profil introuvable' });

    if (String(doc.owner) !== String(student._id) && req.user.role !== 'doyen') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const filePath = path.join(__dirname, '../../uploads', doc.path);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Document.findByIdAndDelete(doc._id);
    await StudentProfile.updateOne({ _id: doc.owner }, { $pull: { documents: doc._id } });

    res.json({ message: 'Document supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// عرض حالة الطلبات المفصّل (with offer and hospital info)
exports.getApplicationsStatus = async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findOne({ user: req.user.id });
    if (!studentProfile) return res.status(404).json({ message: 'Profil introuvable' });

    const apps = await Application.find({ student: studentProfile._id })
      .populate('offer', 'title startDate durationWeeks')
      .populate('hospital', 'name')
      .sort({ appliedAt: -1 });

    res.json({ applications: apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
