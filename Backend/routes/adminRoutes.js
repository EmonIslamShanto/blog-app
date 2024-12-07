import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getDashboardSummary, searchData } from '../controllers/adminController.js';

const router = express.Router();

router.get('/summary', protect, getDashboardSummary);
router.get('/search', protect, searchData);

export default router;
