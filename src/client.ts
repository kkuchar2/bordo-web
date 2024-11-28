import axios from 'axios';
import Cookies from 'universal-cookie';

import { getEnvVar } from '@/config';

export const ApiClient = axios.create({
    baseURL: `${getEnvVar('NEXT_PUBLIC_BORDO_API_URL')}/`
});

export const refreshTokenFn = async () => {
    const response = await ApiClient.post('account/token-refresh', {}, {
        withCredentials: true,
        headers: {
            'X-XSRF-TOKEN': new Cookies().get('XSRF-TOKEN'),
        }
    });
    return response.data;
};

ApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry
            && originalRequest.url !== 'account/token-refresh' && originalRequest.url !== '/login') {
            await refreshTokenFn();
            originalRequest._retry = true;
            return ApiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);