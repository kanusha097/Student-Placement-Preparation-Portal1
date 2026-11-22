import express from 'express';
import { getQuestions, submitAnswer, getHistory } from '../controllers/aptitudeController.js';

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/submit', submitAnswer);
router.get('/history', getHistory);

export default router;
