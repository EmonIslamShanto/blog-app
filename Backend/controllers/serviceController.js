import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { addLog } from './logController.js';
import cloudinary from '../config/cloudinary.js';

// Create a new service
export const createService = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file?.path || null;
    const imagePublicId = req.file?.filename || null;

    if (!name || !description) {
      return res.status(400).json({ message: 'Please provide a name and description for the service' });
    }

    const service = await Service.create({ name, description, imageUrl, imagePublicId });

    // Log the creation
    addLog('Created Service', req.user.id, `Created service with name: ${name}`);

    return res.status(201).json({message: `Created service with name: ${name}`,service});
  } catch (error) {
    return res.status(400).json({ message: 'Service creation failed', error });
  }
};


// Update a service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update the service fields
    const { name, description } = req.body;
    if (name) service.name = name;
    if (description) service.description = description;

    // Update the image if a new one is provided
    if (req.file) {
      if (service.imagePublicId) {
        await cloudinary.uploader.destroy(service.imagePublicId);
      }
      service.imageUrl = req.file.path;
      service.imagePublicId = req.file.filename;
    }

    // Save the updated service
    const updatedService = await service.save();

    // Log the update
    addLog('Updated Service', req.user.id, `Updated service with name: ${updatedService.name}`);

    return res.status(200).json({message: `Updated service with name: ${updatedService.name}`,updatedService});
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update service', error });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services) {
      return res.status(404).json({ message: 'No services found' });
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to fetch services', error });
  }
};


// Get a single service
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to fetch service', error });
  }
};

// Get the last three latest services
export const getLatestServices = async (req, res) => {
  try {
      const services = await Service.find()
          .sort({ createdAt: -1 }) // Sort by creation date in descending order
          .limit(3); // Limit to 3 results

      return res.status(200).json({ message: 'Latest services retrieved successfully', services });
  } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch latest services', error: error.message });
  }
};


/// Delete a service
export const deleteService = async (req, res) => {
  try {
      // Validate ID
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: 'Invalid service ID' });
      }

      // Find service by ID
      const service = await Service.findById(req.params.id);

      if (!service) {
          return res.status(404).json({ message: 'Service not found' });
      }


      // Remove the service
      await service.deleteOne();

      // Log the deletion (wrap in try-catch to avoid crashing if logging fails)
      try {
          await addLog('Deleted Service', req.user.id, `Deleted service with title: ${service.title}`);
      } catch (logError) {
          console.error('Failed to log deletion:', logError);
      }

      // Send success response
      return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
      return res.status(500).json({ 
          message: 'Failed to delete service', 
          error: error.message || 'An unknown error occurred' 
      });
  }
};