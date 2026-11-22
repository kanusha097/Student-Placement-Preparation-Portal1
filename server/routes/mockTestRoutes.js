import express from 'express';
import { 
  getMockTests, 
  getMockTestById, 
  submitMockTest, 
  getAttempts 
} from '../controllers/mockTestController.js';

const router = express.Router();

router.get('/tests', getMockTests);
router.get('/tests/:id', getMockTestById);
router.post('/submit', submitMockTest);
router.get('/attempts', getAttempts);

export default router;
