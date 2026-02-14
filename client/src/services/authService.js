import api from './api';

const authService = {
    register: async (userData) => {
        return await api.post('/auth/register', userData);
    },

    login: async (credentials) => {
        return await api.post('/auth/login', credentials);
    },

    logout: async () => {
        return await api.post('/auth/logout');
    },

    // Optional: get current profile
    getProfile: async () => {
        return await api.get('/auth/profile');
    }
};

export default authService;
