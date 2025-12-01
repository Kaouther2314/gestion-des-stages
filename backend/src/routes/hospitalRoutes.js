const express = require("express");
const router = express.Router();
const { createOffer, listOffers } = require("../controllers/offerController");
const { reviewApplication } = require("../controllers/applicationController");
const {
  myOffers,
  listApplicants,
  updateOffer,
  deleteOffer,
} = require("../controllers/hospitalController");
const { authenticate } = require("../middlewares/authMiddleware");

function authorizeHospital(req, res, next) {
  if (!req.user || req.user.role !== "hopital")
    return res.status(403).json({ message: "غير مصرح" });
  next();
}

// ✅ إنشاء عرض جديد
router.post("/offers", authenticate, authorizeHospital, createOffer);

// ✅ عرض كل العروض المتاحة للجميع
router.get("/offers", listOffers);

// ✅ عرض العروض الخاصة بالمستشفى الحالي
router.get("/my-offers", authenticate, authorizeHospital, myOffers);

// ✅ عرض المتقدمين على عرض معين
router.get(
  "/offers/:offerId/applicants",
  authenticate,
  authorizeHospital,
  listApplicants
);

// ✅ تعديل عرض
router.put("/offers/:id", authenticate, authorizeHospital, updateOffer);

// ✅ حذف عرض
router.delete("/offers/:id", authenticate, authorizeHospital, deleteOffer);

// ✅ قبول / رفض الطلب
router.post(
  "/applications/:id/review",
  authenticate,
  authorizeHospital,
  reviewApplication
);

module.exports = router;
