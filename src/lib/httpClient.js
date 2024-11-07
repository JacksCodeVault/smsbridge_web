import axios from 'axios';
import { API_BASE_URL, ERROR_MESSAGES } from '../utils/constants';

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
httpClient.interceptors.response.use(
    (response) => {
        console.log('HTTP Client: Successful response:', response)
        return response.data;
    },
    (error) => {
        console.error('HTTP Client: Error response:', {
            status: error.response?.status,
            data: error.response?.data,
            error: error.message
        })
        
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('HTTP Client: Unauthorized access')
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    return Promise.reject(ERROR_MESSAGES.UNAUTHORIZED);                
                case 403:
                    return Promise.reject(ERROR_MESSAGES.UNAUTHORIZED);
                
                case 404:
                    return Promise.reject(error.response.data.error || 'Resource not found');
                
                case 422:
                    return Promise.reject(error.response.data.error || 'Validation error');
                
                default:
                    return Promise.reject(error.response.data.error || 'Something went wrong');
            }
        }

        if (error.request) {
            return Promise.reject(ERROR_MESSAGES.NETWORK_ERROR);
        }

        return Promise.reject(error.message);
    }
);
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete httpClient.defaults.headers.common['Authorization'];
    }
};

export const clearAuthToken = () => {
    localStorage.removeItem('token');
    delete httpClient.defaults.headers.common['Authorization'];
};

export default httpClient;
