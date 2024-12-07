import mongoose from 'mongoose';
import Team from '../models/Team.js';
import { addLog } from './logController.js';
import cloudinary from '../config/cloudinary.js';

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    const { name, role, bio } = req.body;
    const imageUrl = req.file?.path || null;
    const imagePublicId = req.file?.filename || null;

    const teamMember = await Team.create({ name, role, bio, imageUrl, imagePublicId });

    // Log the creation
    addLog('Created Team Member', req.user.id, `Created team member with name: ${name}`);

    return res.status(201).json({message: `Created team member with name: ${name}`,teamMember});
  } catch (error) {
    return res.status(400).json({ message: 'Team member creation failed', error });
  }
};



// Update a team member
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Update the team member fields
    const { name, role, bio } = req.body;
    if (name) teamMember.name = name;
    if (role) teamMember.role = role;
    if (bio) teamMember.bio = bio;

    // Update the image if a new one is provided
    if (req.file) {
      if (teamMember.imagePublicId) {
        await cloudinary.uploader.destroy(teamMember.imagePublicId);
      }
      teamMember.imageUrl = req.file.path;
      teamMember.imagePublicId = req.file.filename;
    }

    // Save the updated team member
    const updatedTeamMember = await teamMember.save();

    // Log the update
    addLog('Updated Team Member', req.user.id, `Updated team member with name: ${updatedTeamMember.name}`);

    res.status(200).json(updatedTeamMember);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update team member', error });
  }
};


// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();

    if (!teamMembers) {
      return res.status(404).json({ message: 'No team members found' });
    }

    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch team members', error });
  }
};

// Get a team member by ID
export const getTeamMember = async (req, res) => {
  try {
      const teamMember = await Team.findById(req.params.id);
      if (!teamMember) {
          return res.status(404).json({ message: 'Team member not found' });
      }
      return res.status(200).json(teamMember);
  } catch (error) {
      return res.status(400).json({ message: 'Failed to fetch Team Member', error });
  }
};


// Get the last 3 new team members
export const getNewMembers = async (req, res) => {
  try {
      const teamMembers = await Team.find()
          .sort({ createdAt: -1 }) // Sort by creation date in descending order
          .limit(3); // Limit to 6 results

      return res.status(200).json({ message: 'New Team Members retrieved successfully', teamMembers });
  } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch Team Members', error: error.message });
  }
};


// Delete a team member
export const deleteTeamMember = async (req, res) => {
  try {
      // Validate ID
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: 'Invalid Team ID' });
      }

      // Find team member by ID
      const team = await Team.findById(req.params.id);

      if (!team) {
          return res.status(404).json({ message: 'Team Member not found' });
      }


      // Remove the team member
      await team.deleteOne();

      // Log the deletion (wrap in try-catch to avoid crashing if logging fails)
      try {
          await addLog('Deleted Team Member', req.user.id, `Deleted team member with title: ${team.name}`);
      } catch (logError) {
          console.error('Failed to log deletion:', logError);
      }

      // Send success response
      return res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
      return res.status(500).json({ 
          message: 'Failed to delete the team member', 
          error: error.message || 'An unknown error occurred' 
      });
  }
};