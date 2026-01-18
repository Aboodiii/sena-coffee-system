import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data),
};

export const supplierService = {
    getAll: () => api.get('/suppliers'),
    create: (data) => api.post('/suppliers', data),
};

export const storeService = {
    getAll: () => api.get('/stores'),
    create: (data) => api.post('/stores', data),
};

export const purchaseService = {
    getAll: () => api.get('/purchases'),
    create: (data) => api.post('/purchases', data),
};

export default api;
