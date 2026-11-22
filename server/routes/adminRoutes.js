import express from 'express';
import { 
  getAdminOverview, 
  getStudents, 
  toggleStudentRole, 
  deleteStudent,
  getCodingQuestions, 
  addCodingQuestion, 
  deleteCodingQuestion,
  getAptitudeQuestions, 
  addAptitudeQuestion, 
  deleteAptitudeQuestion,
  getMockTests, 
  addMockTest 
} from '../controllers/adminController.js';

const router = express.Router();

// Overview
router.get('/overview', getAdminOverview);

// Student Accounts Management
router.get('/students', getStudents);
router.post('/students/:id/role', toggleStudentRole);
router.delete('/students/:id', deleteStudent);

// Coding Question Bank CRUD
router.get('/coding-questions', getCodingQuestions);
router.post('/coding-questions', addCodingQuestion);
router.delete('/coding-questions/:id', deleteCodingQuestion);

// Aptitude Question Bank CRUD
router.get('/aptitude-questions', getAptitudeQuestions);
router.post('/aptitude-questions', addAptitudeQuestion);
router.delete('/aptitude-questions/:id', deleteAptitudeQuestion);

// Mock Tests CRUD
router.get('/mock-tests', getMockTests);
router.post('/mock-tests', addMockTest);

export default router;
