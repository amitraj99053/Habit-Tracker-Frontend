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
    const { timeout = 60000, maxRetries = 1, ...fetchOptions } = options;

    let attempt = 0;
    while (true) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...fetchOptions,
                signal: controller.signal
            });
            clearTimeout(id);

            if (response.status === 401) {
                window.dispatchEvent(new CustomEvent('auth-unauthorized'));
            }

            return response;
        } catch (error) {
            clearTimeout(id);
            attempt++;

            const isTimeout = error.name === 'AbortError';
            const isNetworkError = error.message && (
                error.message.includes('Failed to fetch') || 
                error.message.includes('NetworkError') || 
                error.message.includes('network')
            );

            if (attempt <= maxRetries && (isTimeout || isNetworkError)) {
                console.warn(`Request to ${endpoint} failed (attempt ${attempt}/${maxRetries + 1}). Retrying in 1.5s due to: ${error.message || error.name}...`);
                await new Promise(resolve => setTimeout(resolve, 1500));
                continue;
            }

            if (isTimeout) {
                throw new Error('Request timed out. Please check your connection.');
            }
            throw error;
        }
    }
};
