import axios from './axiosConfig';

// Get all blogs
export const getBlogs = async () => {
  const response = await axios.get('/blogs');
  return response.data;
};


// Get a blog by id
export const getBlogById = async (id) => {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
};


// Create a blog
export const createBlog = async (blogData) => {
  const response = await axios.post('/blogs/create', blogData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Update a blog
export const updateBlog = async (id, blogData) => {
  const response = await axios.put(`/blogs/${id}`, blogData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Delete a blog
export const deleteBlog = async (id) => {
  const response = await axios.delete(`/blogs/${id}`);
  return response.data;
};
