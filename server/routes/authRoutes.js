import express from 'express';
import { register, login, getProfile, updateProfile, forgotPassword } from '../controllers/authController.js';
import { verifyTokenMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyTokenMiddleware, getProfile);
router.put('/profile', verifyTokenMiddleware, updateProfile);
router.post('/forgot-password', forgotPassword);

export default router;
