import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getSettings,
  getSettingByKey,
  upsertSetting,
  deleteSetting,
} from '../controllers/settingController.js';

const router = express.Router();

// Fetch all settings
router.get('/', protect, getSettings);

// Fetch a specific setting by key
router.get('/:key', protect, getSettingByKey);

// Create or update a setting
router.post('/', protect, upsertSetting);

// Delete a setting
router.delete('/:key', protect, deleteSetting);

export default router;
