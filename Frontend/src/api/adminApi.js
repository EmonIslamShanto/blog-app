import axios from './axiosConfig';

// Fetch dashboard summary
export const getDashboardSummary = async () => {
  const response = await axios.get('/admin/summary');
  return response.data;
};
