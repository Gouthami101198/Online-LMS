import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API configuration
export const API_BASE_URL = 'https://api.edupath.io/v1';

// Create real Axios instance ready for backend connection
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for injecting auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('edupath_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh & centralized error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error e.g. logout or refresh
      console.warn('Unauthorized request - session expired or invalid credentials');
    }
    return Promise.reject(error);
  }
);

// Simulated Mock API utility that provides realistic async delays and fallbacks
export const simulateApiCall = async <T>(data: T, delayMs: number = 300, shouldFail: boolean = false): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Simulated network request failed. Please try again.'));
      } else {
        resolve(data);
      }
    }, delayMs);
  });
};

