// src/api/api.js
// Central API helper for all backend requests

const API_BASE = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Save token to localStorage
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Generic fetch wrapper
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  // Build headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token if it exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    // If response is not ok, throw error
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ========== AUTH APIs ==========

// Register new user
export const register = async (name, email, password) => {
  const data = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  
  // Save token after successful registration
  if (data.token) {
    saveToken(data.token);
  }
  
  return data;
};

// Login user
export const login = async (email, password) => {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // Save token after successful login
  if (data.token) {
    saveToken(data.token);
  }
  
  return data;
};

// Logout user
export const logout = () => {
  removeToken();
  window.location.href = '/';
};

// Get current user profile
export const getProfile = async () => {
  return await apiCall('/auth/profile', {
    method: 'GET',
  });
};

// ========== BUSINESS APIs ==========

// Create new business
export const createBusiness = async (businessData) => {
  return await apiCall('/businesses', {
    method: 'POST',
    body: JSON.stringify(businessData),
  });
};

// Get all verified businesses (for explore page)
export const getAllBusinesses = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `/businesses?${queryParams}` : '/businesses';
  
  return await apiCall(endpoint, {
    method: 'GET',
  });
};

// Get user's own businesses
export const getMyBusinesses = async () => {
  return await apiCall('/businesses/my', {
    method: 'GET',
  });
};

// Get single business by ID
export const getBusinessById = async (id) => {
  return await apiCall(`/businesses/${id}`, {
    method: 'GET',
  });
};

// Update business
export const updateBusiness = async (id, businessData) => {
  return await apiCall(`/businesses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(businessData),
  });
};

// Delete business
export const deleteBusiness = async (id) => {
  return await apiCall(`/businesses/${id}`, {
    method: 'DELETE',
  });
};

// ========== COLLABORATION APIs ==========

// Send collaboration request
export const sendCollaborationRequest = async (requestData) => {
  return await apiCall('/collaborations', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
};

// Get sent requests
export const getSentRequests = async () => {
  return await apiCall('/collaborations/sent', {
    method: 'GET',
  });
};

// Get received requests
export const getReceivedRequests = async () => {
  return await apiCall('/collaborations/received', {
    method: 'GET',
  });
};

// Respond to collaboration request (ACCEPT or REJECT)
export const respondToRequest = async (id, status) => {
  return await apiCall(`/collaborations/${id}/respond`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

// ========== NOTIFICATION APIs ==========

// Get all notifications
export const getNotifications = async () => {
  return await apiCall('/notifications', {
    method: 'GET',
  });
};

// Mark single notification as read
export const markNotificationAsRead = async (id) => {
  return await apiCall(`/notifications/${id}/read`, {
    method: 'PUT',
  });
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  return await apiCall('/notifications/read-all', {
    method: 'PUT',
  });
};

// ========== HELPER FUNCTIONS ==========

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};

// Redirect to login if not authenticated
export const requireAuth = () => {
  if (!isLoggedIn()) {
    window.location.href = '/';
    return false;
  }
  return true;
};

export default {
  register,
  login,
  logout,
  getProfile,
  createBusiness,
  getAllBusinesses,
  getMyBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  sendCollaborationRequest,
  getSentRequests,
  getReceivedRequests,
  respondToRequest,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  isLoggedIn,
  requireAuth,
};
