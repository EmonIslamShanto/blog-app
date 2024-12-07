import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { createBlog, getBlog, deleteBlog, updateBlog, getAllBlogs, getLatestBlogs } from '../controllers/blogController.js';

const router = express.Router();

// Route to create a blog (with document upload)
router.post('/create',protect, upload.single('file'), createBlog);

// Route to read all blogs
router.get('/', getAllBlogs)

// Route to read latest blogs
router.get('/latest', getLatestBlogs)

// Route to read a single blog by ID
router.get('/:id', getBlog);

// Route to update a blog (with optional document upload)
router.put('/:id', protect, upload.single('file'), updateBlog);

// Route to delete a blog by ID
router.delete('/:id', protect, deleteBlog);
 
export default router;
