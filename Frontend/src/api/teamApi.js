import axios from './axiosConfig';

// Get all team members
export const getTeamMembers = async () => {
  const response = await axios.get('/teams');
  return response.data;
};

// Get a team member by id
export const getTeamMemberById = async (id) => {
  const response = await axios.get(`/teams/${id}`);
  return response.data;
};

// Create a team member
export const createTeamMember = async (teamData) => {
  const response = await axios.post('/teams', teamData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Update a team member
export const updateTeamMember = async (id, teamData) => {
  const response = await axios.put(`/teams/${id}`, teamData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Delete a team member
export const deleteTeamMember = async (id) => {
  const response = await axios.delete(`/teams/${id}`);
  return response.data;
};
