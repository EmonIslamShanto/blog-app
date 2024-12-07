import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { createBlog, getBlog, deleteBlog, updateBlog, getAllBlogs, getLatestBlogs } from '../controllers/blogController.js';
import { createTeamMember, deleteTeamMember, getAllTeamMembers, getNewMembers, getTeamMember, updateTeamMember } from '../controllers/teamController.js';

const router = express.Router();

// Route to create a team (with document upload)
router.post('/create',protect, upload.single('file'), createTeamMember);

// Route to read all team members
router.get('/', getAllTeamMembers)

// Route to read new team members
router.get('/new', getNewMembers)

// Route to read a single team member by ID
router.get('/:id', getTeamMember);

// Route to update a team member (with optional document upload)
router.put('/:id', protect, upload.single('file'), updateTeamMember);

// Route to delete a blog by ID
router.delete('/:id', protect, deleteTeamMember);
 
export default router;
