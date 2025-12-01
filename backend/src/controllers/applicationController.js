const Application = require('../models/Application');
const StudentProfile = require('../models/StudentProfile');
const StageOffer = require('../models/StageOffer');
const Evaluation = require('../models/Evaluation');

exports.applyToOffer = async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findOne({ user: req.user.id });
    if (!studentProfile) return res.status(400).json({ message: 'Student profile not found' });

    const offer = await StageOffer.findById(req.params.offerId);
    if (!offer || offer.status !== 'published') return res.status(404).json({ message: 'Offer not available' });

    const app = await Application.create({
      student: studentProfile._id,
      offer: offer._id,
      hospital: offer.hospital,
      service: offer.service
    });

    res.status(201).json({ message: 'Applied', application: app });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Already applied' });
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.studentApplications = async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findOne({ user: req.user.id });
    if (!studentProfile) return res.status(400).json({ message: 'Student profile not found' });

    const apps = await Application.find({ student: studentProfile._id })
      .populate('offer')
      .populate('hospital', 'name')
      .populate('service', 'name')
      .sort({ appliedAt: -1 });

    res.json({ applications: apps });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.reviewApplication = async (req, res) => {
  try {
    const { action, note } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = (action === 'accept') ? 'accepted' : 'rejected';
    application.reviewedBy = req.user.id;
    application.reviewedAt = new Date();
    application.note = note || '';

    await application.save();
    res.json({ message: 'Updated', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.evaluate = async (req, res) => {
  try {
    const { competencies, attendance, behavior, comment } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const evaluation = await Evaluation.create({
      application: application._id,
      evaluator: req.user.id,
      scores: { competencies, attendance, behavior },
      comment
    });

    res.status(201).json({ message: 'Evaluation saved', evaluation });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
