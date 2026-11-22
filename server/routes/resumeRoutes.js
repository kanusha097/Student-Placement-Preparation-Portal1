import express from 'express';
import { getResume, saveResume } from '../controllers/resumeController.js';

const router = express.Router();

router.get('/', getResume);
router.post('/', saveResume);

export default router;
