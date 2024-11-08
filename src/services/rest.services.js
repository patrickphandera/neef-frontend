
// const API_BASE_URL = 'https://netpass.onrender.com';

// const API_BASE_URL ='http://127.0.0.1:5000'
// const API_BASE_URL ='https://neefaiappbackend-1.onrender.com'
const API_BASE_URL ='https://neefaiappbackend-1.onrender.com'
import axios from 'axios';
let token=localStorage.getItem('token');
const headers={
  headers: {
    'Authorization': `${token}`, // Pass the token in the headers
   'Content-Type': 'application/json'
  },
};
export async function postData(data,endpoint) {
    try {
      // Make a POST request with headers
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, headers
      );
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error;
    }
  }
  export async function postData1(data,endpoint) {
    try {
      // Make a POST request with headers
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, headers
      );
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error;
    }
  }
  export async function putData(data,endpoint) {
    try {
      // Make a POST request with headers
      const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data, headers);
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error;
    }
  }

  export async function deleteData(endpoint) {
    try {
      // Make a POST request with headers
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}`,  headers);
  
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error;
    }
  }
  export async function getData(endpoint,id) {
    try {
      // Make a POST request with headers
      const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`,  headers);
  
      // Return the response data
      // console.log(response.data)
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error;
    }
  }



  export async function downloadData(endpoint) {
    try {
      // Make a GET request with headers and response type 'blob' for file downloads
      const result= await axios.get(`${API_BASE_URL}/download/v2/${endpoint}`, headers);
      // Return a success message or data if needed
      return result.data; 
  
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error; // Re-throw the error if needed
    }
  }
  export async function getAllData(endpoint) {
    try {
      // Make a POST request with headers
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
        headers: {
          'Authorization': `${token}`, // Add other headers as needed
        }
      });
      // Return the response data
      // console.log(response.data)
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Request error:', error);
      throw error;
    }
  }
 