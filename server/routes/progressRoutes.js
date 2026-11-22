import express from 'express';
import { getDashboardData, toggleDailyGoal, getActivities } from '../controllers/progressController.js';
import { verifyTokenMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', verifyTokenMiddleware, getDashboardData);
router.post('/goal-toggle', verifyTokenMiddleware, toggleDailyGoal);
router.get('/activities', verifyTokenMiddleware, getActivities);

export default router;
