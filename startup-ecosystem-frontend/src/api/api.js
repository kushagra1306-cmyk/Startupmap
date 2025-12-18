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
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
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

export const register = async (name, email, password) => {
  const data = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  
  if (data.token) {
    saveToken(data.token);
  }
  
  return data;
};

export const login = async (email, password) => {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (data.token) {
    saveToken(data.token);
  }
  
  return data;
};

export const logout = () => {
  removeToken();
  window.location.href = '/';
};

export const getProfile = async () => {
  return await apiCall('/auth/profile', {
    method: 'GET',
  });
};

// ========== BUSINESS APIs ==========

export const createBusiness = async (businessData) => {
  return await apiCall('/businesses', {
    method: 'POST',
    body: JSON.stringify(businessData),
  });
};

export const getAllBusinesses = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `/businesses?${queryParams}` : '/businesses';
  
  return await apiCall(endpoint, {
    method: 'GET',
  });
};

export const getMyBusinesses = async () => {
  return await apiCall('/businesses/my', {
    method: 'GET',
  });
};

export const getBusinessById = async (id) => {
  return await apiCall(`/businesses/${id}`, {
    method: 'GET',
  });
};

export const updateBusiness = async (id, businessData) => {
  return await apiCall(`/businesses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(businessData),
  });
};

export const deleteBusiness = async (id) => {
  return await apiCall(`/businesses/${id}`, {
    method: 'DELETE',
  });
};

// ========== COLLABORATION APIs ==========

export const sendCollaborationRequest = async (requestData) => {
  return await apiCall('/collaborations', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
};

export const getSentRequests = async () => {
  return await apiCall('/collaborations/sent', {
    method: 'GET',
  });
};

export const getReceivedRequests = async () => {
  return await apiCall('/collaborations/received', {
    method: 'GET',
  });
};

export const respondToRequest = async (id, status) => {
  return await apiCall(`/collaborations/${id}/respond`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

// ========== NOTIFICATION APIs ==========

export const getNotifications = async () => {
  return await apiCall('/notifications', {
    method: 'GET',
  });
};

export const markNotificationAsRead = async (id) => {
  return await apiCall(`/notifications/${id}/read`, {
    method: 'PUT',
  });
};

export const markAllNotificationsAsRead = async () => {
  return await apiCall('/notifications/read-all', {
    method: 'PUT',
  });
};

// ========== HELPER FUNCTIONS ==========

export const isLoggedIn = () => {
  return !!getToken();
};

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