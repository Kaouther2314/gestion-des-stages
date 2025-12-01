const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

// create user (doyen only)
router.post('/users', authenticate, authorize('doyen'), adminCtrl.createUser);

// list users
router.get('/users', authenticate, authorize('doyen'), adminCtrl.listUsers);

// update user
router.put('/users/:id', authenticate, authorize('doyen'), adminCtrl.updateUser);

// delete user (optional)
router.delete('/users/:id', authenticate, authorize('doyen'), adminCtrl.deleteUser);

// toggle active
router.patch('/users/:id/toggle', authenticate, authorize('doyen'), adminCtrl.toggleUserActive);

// stats
router.get('/stats', authenticate, authorize('doyen'), adminCtrl.getStats);

// export CSV
router.get('/export', authenticate, authorize('doyen'), adminCtrl.exportCSV);

module.exports = router;
