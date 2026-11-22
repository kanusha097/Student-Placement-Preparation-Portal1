import express from 'express';
import { 
  getQuestions, 
  getQuestionById, 
  runCode, 
  submitCode, 
  getSubmissions, 
  getLeaderboard 
} from '../controllers/codingController.js';
import { verifyTokenMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/run', runCode);
router.post('/submit', submitCode);
router.get('/submissions', getSubmissions);
router.get('/leaderboard', getLeaderboard);

export default router;
