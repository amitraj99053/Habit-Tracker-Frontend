const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || '';
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    if (url.endsWith('/api')) {
        return url;
    }
    return url ? `${url}/api` : '/api';
};

const API_URL = getBaseUrl();

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'x-auth-token': token || ''
    };
};

export const fetchWithTimeout = async (endpoint, options = {}) => {
    const { timeout = 8000, ...fetchOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...fetchOptions,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please check your connection.');
        }
        throw error;
    }
};
