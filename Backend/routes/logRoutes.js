import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getLatestLogs, getLogs } from '../controllers/logController.js';

const router = express.Router();

// Fetch all logs
router.get('/', protect, getLogs);

// Fetch latest logs
router.get('/latest', protect, getLatestLogs);

export default router;
