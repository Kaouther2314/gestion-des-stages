const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
  getServiceApplications,
  reviewApplication,
  evaluateStudent,
} = require('../controllers/doctorController');

// ✅ Middleware: يتحقق أن المستخدم طبيب فقط
function authorizeDoctor(req, res, next) {
  if (!req.user || req.user.role !== 'medecin') {
    return res.status(403).json({ message: 'غير مصرح' });
  }
  next();
}

// ✅ 1. عرض كل الطلبات الخاصة بخدمة الطبيب
router.get('/applications', authenticate, authorizeDoctor, getServiceApplications);

// ✅ 2. قبول أو رفض طلب معين
router.post('/applications/:id/review', authenticate, authorizeDoctor, reviewApplication);

// ✅ 3. تقييم الطالب بعد نهاية التدريب
router.post('/applications/:id/evaluate', authenticate, authorizeDoctor, evaluateStudent);

module.exports = router;
