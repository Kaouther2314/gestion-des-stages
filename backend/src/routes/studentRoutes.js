const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
const upload = require('../middlewares/uploadMiddleware');

const studentCtrl = require('../controllers/studentController');
const appCtrl = require('../controllers/applicationController');

// existing routes...
router.post('/offers/apply/:offerId', authenticate, authorize('etudiant'), appCtrl.applyToOffer);
router.get('/applications', authenticate, authorize('etudiant'), appCtrl.studentApplications);

// profile
router.put('/profile', authenticate, authorize('etudiant'), studentCtrl.updateProfile);

// documents
router.post('/documents', authenticate, authorize('etudiant'), upload.single('file'), studentCtrl.uploadDocument);
router.get('/documents', authenticate, authorize('etudiant'), studentCtrl.listDocuments);
router.delete('/documents/:id', authenticate, authorize('etudiant'), studentCtrl.deleteDocument);

// applications status
router.get('/applications/status', authenticate, authorize('etudiant'), studentCtrl.getApplicationsStatus);

module.exports = router;
