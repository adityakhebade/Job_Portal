import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor for responses to handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect if needed
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;
