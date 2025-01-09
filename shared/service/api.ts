import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

const baseURL = Config.API_HOST || `https://api.kontenbase.com/query/api/v1/f8c8b679-54eb-449f-869b-0434d39326d3`;


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
    }
    return Promise.reject(error);
  }
);

export default api;
