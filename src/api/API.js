import axios from 'axios';
import {getCookie, deleteCookie} from './../utils/CookieUtils';

const FAST_API_BASE_URL = 'http://127.0.0.1:8000';

const createApiClient = () => {
    const apiClient = axios.create({
        baseURL: FAST_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    apiClient.interceptors.request.use((config) => {
        const token = getCookie('accessToken');
        if (token) config.headers.token = `${token}`;
        return config;
    });

    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                deleteCookie('accessToken');
            }
            return Promise.reject(error);
        }
    );

    return apiClient;
};

const apiClient = createApiClient();

export const getAccessToken = async (credentials) => {
    try {
        const response = await apiClient.post(`/auth/get_token?${new URLSearchParams(credentials)}`);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const validateToken = async (credentials) => {
    try {
        const response = await apiClient.post(`/auth/validate_token`);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const fetchInvoices = async () => {
    try {
        const response = await apiClient.get(`/invoices`);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const fetchInvoice = async (id) => {
    try {
        const response = await apiClient.get(`/invoice/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const createInvoice = async (values) => {
    try {
        const response = await apiClient.post(`/create_invoice`, values);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const updateInvoice = async (values) => {
    try {
        const response = await apiClient.patch(`/update_invoice/${values.id}`, values);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
