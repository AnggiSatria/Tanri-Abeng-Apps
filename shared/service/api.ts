import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_HOST, API_PORT } from '@env';

const baseURL = `${API_HOST}:${API_PORT}`;

const api = axios.create({
  baseURL,
  timeout: 10000,
});

// Tambahkan interceptor untuk token persist
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      // Tambahkan logika logout jika diperlukan
    }
    return Promise.reject(error);
  }
);

export default api;
