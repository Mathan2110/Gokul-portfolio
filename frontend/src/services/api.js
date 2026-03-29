import axios from 'axios';

/**
 * Axios instance with base URL pointing to our Express API
 */
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Response interceptor for error normalization
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// ─── API Service Layer ─────────────────────────────────────────

export const portfolioApi = {
  getAll: (category) => api.get('/portfolio', { params: { category } }),
  getFeatured: () => api.get('/portfolio/featured'),
  seed: () => api.post('/portfolio/seed'),
};

export const reviewApi = {
  getAll: () => api.get('/reviews'),
  submit: (data) => api.post('/reviews', data),
  seed: () => api.post('/reviews/seed'),
};

export const serviceApi = {
  getAll: () => api.get('/services'),
  seed: () => api.post('/services/seed'),
};

export const contactApi = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
};

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  seedAdmin: () => api.post('/auth/seed-admin'),
};

export default api;