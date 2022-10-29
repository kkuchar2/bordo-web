import axios from 'axios';
import Cookies from 'universal-cookie';

import { getEnvVar} from './api/config';

const ApiClient = axios.create({
    baseURL: `${getEnvVar('VITE_BORDO_API_URL')}/`,
    //timeout: 10000,   // 10 seconds for user focus
});

export const refreshTokenFn = async () => {
    const response = await ApiClient.post('account/token-refresh', {}, {
        withCredentials: true,
        headers: {
            'X-CSRFTOKEN': new Cookies().get('csrftoken'),
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
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== 'account/token-refresh') {
            await refreshTokenFn();
            originalRequest._retry = true;
            return ApiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default ApiClient;