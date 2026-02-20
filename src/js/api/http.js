import axios from 'axios';
import { BASE_URL } from '../config/config';

axios.defaults.baseURL = BASE_URL;

export async function request(endpoint, options = {}, method = '') {
  try {
    const response = await axios({ url: endpoint, method, ...options });
    console.log("🚀 ~ request ~ response:", response.data)
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(`Failed to load ${endpoint}: ${errorMessage}`, {
      cause: error,
    });
  }
}

export const http = {
  get: (endpoint, options = {}) => request(endpoint, options, 'get'),
  post: (endpoint, data, options = {}) =>
    request(endpoint, { ...options, data }, 'post'),
};

