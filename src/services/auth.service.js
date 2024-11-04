// src/services/register.js

import axios from 'axios';
let token=localStorage.getItem('token');
// Access the base URL from environment variables
const API_BASE_URL ='https://neefaiappbackend-1.onrender.com'
// const API_BASE_URL="http://127.0.0.1:5000"
// Function to handle user registration
const headers={
  headers: {
    'Authorization': `${token}`, // Pass the token in the headers
   'Content-Type': 'application/json'
  },
};
export async function registerUser(userData) {
  try {
    // Make a POST request to the registration endpoint
    const response = await axios.post(`${API_BASE_URL}/register`, userData,headers);
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}


export async function loginUser(credentials) {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post(`${API_BASE_URL}/login`, credentials,headers);
    
    // Check if the response contains a token
    if (response.data.access_token) {
      // Save the token to local storage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', response.data.user);
      
    }

    // Return the response data (e.g., user info, success message)
    return response.data;
  } catch (error) {
    // Handle errors (e.g., show an error message to the user)
    console.error('Login error:', error);
    throw error;
  }
}


export async function logoutUser() {
  try {
    // Make a POST request to the logout endpoint with headers
    await axios.post(`${API_BASE_URL}/logout`, {}, headers,
    );

    // Clear local storage and redirect
    localStorage.clear();
    return window.location.href = '/login';
  } catch (error) {
    // Handle errors
    console.error('Logout error:', error);
    throw error;
  }
}


