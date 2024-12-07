import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { createService, deleteService, getAllServices, getLatestServices, getService, updateService } from '../controllers/serviceController.js';

const router = express.Router();

// Route to create a blog (with document upload)
router.post('/create',protect, upload.single('file'), createService);

// Route to read all blogs
router.get('/', getAllServices)

// Route to read latest blogs
router.get('/latest', getLatestServices)

// Route to read a single blog by ID
router.get('/:id', getService);

// Route to update a blog (with optional document upload)
router.put('/:id', protect, upload.single('file'), updateService);

// Route to delete a blog by ID
router.delete('/:id', protect, deleteService);
 
export default router;

