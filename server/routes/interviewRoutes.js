import express from 'express';
import { 
  getHRQuestions, 
  getTechnicalQuestions, 
  evaluateAIAnswer, 
  getInterviewAttempts 
} from '../controllers/interviewController.js';

const router = express.Router();

router.get('/hr', getHRQuestions);
router.get('/technical', getTechnicalQuestions);
router.post('/evaluate', evaluateAIAnswer);
router.get('/attempts', getInterviewAttempts);

export default router;
