import axios from './axiosConfig';

// Get all services
export const getServices = async () => {
  const response = await axios.get('/services');
  return response.data;
};

// Get a service by id
export const getServiceById = async (id) => {
  const response = await axios.get(`/services/${id}`);
  return response.data;
};

// Create a service
export const createService = async (serviceData) => {
  const response = await axios.post('/services/create', serviceData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Update a service
export const updateService = async (id, serviceData) => {
  const response = await axios.put(`/services/${id}`, serviceData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Delete a service
export const deleteService = async (id) => {
  const response = await axios.delete(`/services/${id}`);
  return response.data;
};
