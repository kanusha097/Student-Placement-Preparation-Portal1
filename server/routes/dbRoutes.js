import express from 'express';
import { getDBStatus, syncDB } from '../controllers/dbController.js';

const router = express.Router();

router.get('/status', getDBStatus);
router.post('/sync', syncDB);

export default router;
