import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

// Function to get headers dynamically
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': token ? `${token}` : '',
      'Content-Type': 'application/json'
    }
  };
};

// Generic function to handle API requests
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
      ...getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};

// Specific API functions using the generic request function
export const postData = (data, endpoint) => apiRequest('post', endpoint, data);
export const putData = (data, endpoint) => apiRequest('put', endpoint, data);
export const deleteData = (endpoint) => apiRequest('delete', endpoint);
export const getData = (endpoint, id) => apiRequest('get', `${endpoint}/${id}`);
export const downloadData = (endpoint) => apiRequest('get', `download/v2/${endpoint}`);
export const getAllData = (endpoint) => apiRequest('get', endpoint);
