import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure this points to your backend
});


// Interceptor to add Authorization header if token exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token; // Change from Authorization to token
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default instance;
