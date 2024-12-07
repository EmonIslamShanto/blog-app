import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';
import { addLog } from './logController.js';

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const imageUrl = req.file?.path || null;
        const imagePublicId = req.file?.filename || null;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const blog = await Blog.create({
            title,
            content,
            author: req.user.id,
            imageUrl,
            imagePublicId,
        });

        // Log the creation
        addLog('Created Blog', req.user.id, `Created blog with title: ${title}`);

        return res.status(201).json( {message: `Created blog with title: ${title}`, blog});
    } catch (error) {
        return res.status(400).json({ message: 'Blog creation failed', error });
    }
};


// Update a blog
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Update the blog fields
        const { title, content } = req.body;
        if (title) blog.title = title;
        if (content) blog.content = content;

        // Update the image if a new one is provided
        if (req.file) {
            if (blog.imagePublicId) {
                await cloudinary.uploader.destroy(blog.imagePublicId);
            }
            blog.imageUrl = req.file.path;
            blog.imagePublicId = req.file.filename;
        }

        // Save the updated blog
        const updatedBlog = await blog.save();

        // Log the update
        addLog('Updated Blog', req.user.id, `Updated blog with title: ${updatedBlog.title}`);

        return res.status(200).json({message: `Updated blog with title: ${updatedBlog.title}`,updatedBlog});
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update blog', error });
    }
};

// Get a blog by ID
export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(400).json({ message: 'Failed to fetch blogs', error });
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(400).json({ message: 'Failed to fetch blogs', error });
    }
};

// Get the last six latest blogs
export const getLatestBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .limit(6); // Limit to 6 results

        return res.status(200).json({ message: 'Latest blogs retrieved successfully', blogs });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch latest blogs', error: error.message });
    }
};


/// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }

        // Find blog by ID
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }


        // Remove the blog
        await blog.deleteOne();

        // Log the deletion (wrap in try-catch to avoid crashing if logging fails)
        try {
            await addLog('Deleted Blog', req.user.id, `Deleted blog with title: ${blog.title}`);
        } catch (logError) {
            console.error('Failed to log deletion:', logError);
        }

        // Send success response
        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Failed to delete blog', 
            error: error.message || 'An unknown error occurred' 
        });
    }
};