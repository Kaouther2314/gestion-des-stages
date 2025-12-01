const Application = require('../models/Application');
const User = require('../models/user');
const Offer = require('../models/StageOffer');

// ✅ 1. عرض كل الطلبات الخاصة بخدمة الطبيب
exports.getServiceApplications = async (req, res) => {
  try {
    // نبحث عن كل الطلبات الموجهة للطبيب الحالي (حسب الخدمة أو المستشفى)
    const applications = await Application.find({ doctor: req.user._id })
      .populate('student', 'name email')
      .populate('offer', 'title service duration');

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ أثناء جلب الطلبات' });
  }
};

// ✅ 2. قبول أو رفض الطلب
exports.reviewApplication = async (req, res) => {
  try {
    const { status } = req.body; // يمكن أن تكون 'accepté' أو 'refusé'
    const app = await Application.findById(req.params.id);

    if (!app) return res.status(404).json({ message: 'الطلب غير موجود' });

    // الطبيب يمكنه فقط مراجعة الطلبات الخاصة به
    if (String(app.doctor) !== String(req.user._id)) {
      return res.status(403).json({ message: 'غير مصرح بمراجعة هذا الطلب' });
    }

    app.status = status;
    await app.save();

    res.json({ message: `تم تحديث حالة الطلب إلى ${status}`, application: app });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء مراجعة الطلب' });
  }
};

// ✅ 3. تقييم الطالب بعد نهاية التدريب
exports.evaluateStudent = async (req, res) => {
  try {
    const { evaluation, note } = req.body; // evaluation: نص / note: علامة عددية
    const app = await Application.findById(req.params.id).populate('student');

    if (!app) return res.status(404).json({ message: 'الطلب غير موجود' });

    if (String(app.doctor) !== String(req.user._id)) {
      return res.status(403).json({ message: 'غير مصرح بتقييم هذا الطالب' });
    }

    // تخزين التقييم
    app.evaluation = {
      text: evaluation,
      note: note,
      date: new Date(),
    };
    app.status = 'terminé'; // تعني أن الطالب أنهى تدريبه
    await app.save();

    res.json({
      message: 'تم تقييم الطالب بنجاح ✅',
      evaluation: app.evaluation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء التقييم' });
  }
};
