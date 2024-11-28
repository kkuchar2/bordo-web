import { GiphyFetch } from '@giphy/js-fetch-api';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { showErrorToast } from '@/components/Toast/readyToastNotifications';
import { QueryResponseError } from '@/queries/base';

export const environment: Record<string, string | undefined> = {
    'NEXT_PUBLIC_BORDO_API_URL': process.env.NEXT_PUBLIC_BORDO_API_URL,
    'NEXT_PUBLIC_GIPHY_API_KEY': process.env.NEXT_PUBLIC_GIPHY_API_KEY
};

export const getEnvVar = (key: string): any => {
    if (key in environment) {
        return environment[key];
    }
    return null;
};

export const missingEnvVars: string[] = [];

for (const key in environment) {
    if (!environment[key]) {
        missingEnvVars.push(key);
    }
}

if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'development') {
    console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}
else if (missingEnvVars.length > 0) {
    console.error('Configuration of app is missing. ', missingEnvVars, 'Please contact the administrator.');
}

const giphyKey = getEnvVar('NEXT_PUBLIC_GIPHY_API_KEY');
export const giphyFetch = giphyKey ? new GiphyFetch(giphyKey) : null;

export const SUPPORTED_LANGUAGES = ['en', 'pl', 'es', 'fr', 'de'];

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onError: (error: Error) => {
            console.log('Global error handler:', error);

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;

                console.log('Detected Axios error code: ' + axiosError.code);
                switch (axiosError.code) {
                case 'ERR_FR_TOO_MANY_REDIRECTS':
                    showErrorToast('Too many redirects');
                    break;
                case 'ERR_BAD_OPTION_VALUE':
                    showErrorToast('Bad option value');
                    break;
                case 'ERR_BAD_OPTION':
                    showErrorToast('Bad option');
                    break;
                case 'ERR_DEPRECATED':
                    showErrorToast('Deprecated');
                    break;
                case 'ERR_BAD_RESPONSE':
                    showErrorToast('Bad response');
                    break;
                case 'ERR_NOT_SUPPORT':
                    showErrorToast('Not supported');
                    break;
                case 'ERR_INVALID_URL':
                    showErrorToast('Invalid URL');
                    break;
                case 'ERR_CANCELED':
                    showErrorToast('Canceled');
                    break;
                case 'ECONNABORTED':
                    showErrorToast('Connection aborted');
                    break;
                case 'ETIMEDOUT':
                    showErrorToast('Timed out');
                    break;
                default:
                    showErrorToast('Error: ' + axiosError.message);
                    break;
                }
                return;
            }
            else {
                const queryResponseError = error as QueryResponseError;

                if (!queryResponseError.validationResponse) {
                    showErrorToast('Error: ' + queryResponseError.message);
                }
            }

        },
        onSuccess: (data) => {
            console.log('Global success handler:', data);
        },
        onSettled: (data: unknown, error: Error | null) => {
            console.log('Global settled handler:', { data, error });

            if (axios.isAxiosError(error)) {
                console.log('Axios error:', error.response?.data);
            }
        },
        onMutate: (variables) => {
            console.log('Global mutate handler:', variables);
        },
    }),
    queryCache: new QueryCache({
        onSuccess: (data, query) => {
            console.log(`QueryCache Success [${query.queryKey}]`, data);
        },
        onError: (error, query) => {
            console.log(`QueryCache Error[${query.queryKey}]`, error);

            // // if 401:
            // if (error.status === 401) {
            //     console.log('Error data: ' + error.data);
            // }
            //
            // if (error.message === 'Network Error') {
            //     showErrorToast('Error connecting to server');
            // }
            // else if (error.status === 500) {
            //     showErrorToast('Server error');
            // }
        }
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: true,
            retry: 0,
            staleTime: 5 * 1000
        },
    }
});
