import axios from 'axios';
import { baseUrl } from '../utils/constants';

export const API = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // REQUIRED for HttpOnly cookies
});

API.interceptors.request.use(
  (request) => {
    // Automatically handle FormData vs JSON
    if (request.data instanceof FormData) {
      request.headers['Content-Type'] = 'multipart/form-data';
    } else {
      request.headers['Content-Type'] = 'application/json';
    }

    // NOTE: We REMOVED the manual Authorization header code 
    // because the browser automatically attaches the 'jwt' cookie
    
    return request;
  },
  (error) => {
    return Promise.reject(error?.response?.data || error?.response || error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check for 401 Unauthorized (Your ERR_AUTH)
    if (error.response && error.response.status === 401) {
      // Since your BE handles tokens via cookies, if the cookie is expired,
      // the user is simply logged out.
      
      if (typeof window !== 'undefined') {
        // Optional: Clear any local user state (e.g., from localStorage)
        // localStorage.removeItem('user-info'); 
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }

    // Ensure we always return the error structure your BE sends (ApiResponse)
    return Promise.reject(error?.response?.data || error?.response || error);
  }
);