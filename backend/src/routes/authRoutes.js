const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/login', authCtrl.login);

// create user (admin only)
router.post('/create-user', authenticate, authorize('doyen'), authCtrl.createUserByAdmin);

// refresh
router.post('/refresh', authCtrl.refresh);

// logout
router.post('/logout', authCtrl.logout);

module.exports = router;
