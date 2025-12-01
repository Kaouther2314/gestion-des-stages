const StageOffer = require('../models/StageOffer');
const Hospital = require('../models/Hospital');
const Service = require('../models/Service');

exports.createOffer = async (req, res) => {
  try {
    // req.user expected to be set by auth middleware (user is hospital)
    const hospital = await Hospital.findOne({ user: req.user.id });
    if (!hospital) return res.status(400).json({ message: 'Hospital profile not found' });

    const { serviceId, title, description, durationWeeks, startDate, places } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(400).json({ message: 'Service not found' });

    const offer = await StageOffer.create({
      hospital: hospital._id,
      service: service._id,
      title, description, durationWeeks, startDate, places
    });

    res.status(201).json({ message: 'Offer created', offer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listOffers = async (req, res) => {
  try {
    const q = { status: 'published' };
    if (req.query.hospital) q.hospital = req.query.hospital;
    if (req.query.service) q.service = req.query.service;

    const offers = await StageOffer.find(q)
      .populate('hospital','name')
      .populate('service','name')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ offers });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
