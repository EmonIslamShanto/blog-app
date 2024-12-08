import axios from './axiosConfig';

// Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};


// Log in a user
export const loginUser = async ({email, password}) => {
  // Send data in JSON format in the body of the request
  const response = await axios.post('/auth/login', { email, password });
  return response.data; // Return the response data (user data and token)
};
