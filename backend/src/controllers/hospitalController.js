const Offer = require("../models/StageOffer");
const Application = require("../models/Application");
const User = require("../models/user");

// ✅ عرض العروض الخاصة بالمستشفى
exports.myOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ hopital: req.user.id });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ عرض المتقدمين لكل عرض
exports.listApplicants = async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const applications = await Application.find({ offer: offerId })
      .populate("student", "name email cv")
      .select("status createdAt");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ تعديل عرض
exports.updateOffer = async (req, res) => {
  try {
    const { title, description, specialty, places } = req.body;
    const offer = await Offer.findOneAndUpdate(
      { _id: req.params.id, hopital: req.user.id },
      { title, description, specialty, places },
      { new: true }
    );
    if (!offer) return res.status(404).json({ message: "العرض غير موجود" });
    res.json({ message: "تم تعديل العرض بنجاح ✅", offer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ حذف عرض
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findOneAndDelete({
      _id: req.params.id,
      hopital: req.user.id,
    });
    if (!offer) return res.status(404).json({ message: "العرض غير موجود" });
    res.json({ message: "تم حذف العرض بنجاح 🗑️" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
