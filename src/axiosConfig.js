// src/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://taxidi-z3d0.onrender.com', // Replace with your API base URL
  //timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  }
});

axiosInstance.defaults.withCredentials = true;

// // You can also set up interceptors here if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify request config before sending the request
//     // For example, add an authorization token
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response;
//   },
//   (error) => {
//     // Handle response error
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error (e.g., redirect to login)
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
