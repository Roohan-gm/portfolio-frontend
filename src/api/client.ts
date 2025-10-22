import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptors here if needed
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log('→ Request:', config.method?.toUpperCase(), config.url);
  }
  return config;
});

export default api;