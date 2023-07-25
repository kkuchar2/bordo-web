// noinspection SpellCheckingInspection

import { GiphyFetch } from '@giphy/js-fetch-api';
import { QueryCache, QueryClient } from '@tanstack/react-query';

import { showErrorToast } from '@/components/Toast/readyToastNotifications';

export const GOOGLE_CLIENT_ID = '548057113652-60s2uh11sbfvb8sorn2amii2d4316pbi.apps.googleusercontent.com';

export const environment = {
    'NEXT_PUBLIC_BORDO_API_URL': process.env.NEXT_PUBLIC_BORDO_API_URL,
    'NEXT_PUBLIC_GIPHY_API_KEY': process.env.NEXT_PUBLIC_GIPHY_API_KEY,
    'NEXT_PUBLIC_PUSHER_API_KEY': process.env.NEXT_PUBLIC_PUSHER_API_KEY,
    'NEXT_PUBLIC_PUSHER_WS_HOST': process.env.NEXT_PUBLIC_PUSHER_WS_HOST,
    'NEXT_PUBLIC_PUSHER_WS_PORT': process.env.NEXT_PUBLIC_PUSHER_WS_PORT
};

const requiredBaseEnvVars = [
    'NEXT_PUBLIC_BORDO_API_URL',
    'NEXT_PUBLIC_GIPHY_API_KEY',
];

const requiredPusherEnvVars = [
    'NEXT_PUBLIC_PUSHER_API_KEY',
    'NEXT_PUBLIC_PUSHER_WS_HOST',
    'NEXT_PUBLIC_PUSHER_WS_PORT'
];

export const getEnvVar = (key: string): any => {
    if (key in environment) {
        return environment[key];
    }
    return null;
};

export const missingEnvVars = [];

requiredBaseEnvVars.forEach((key) => {
    const v = getEnvVar(key);
    if (!v) {
        missingEnvVars.push(key);
    }
});

if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'development') {
    console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}
else if (missingEnvVars.length > 0) {
    console.error('Configuration of app is missing. ', missingEnvVars, 'Please contact the administrator.');
}

export const isPusherEnvSet = requiredPusherEnvVars.every((key) => getEnvVar(key));

const giphyKey = getEnvVar('NEXT_PUBLIC_GIPHY_API_KEY');
export const giphyFetch = giphyKey ? new GiphyFetch(giphyKey) : null;

export const SUPPORTED_LANGUAGES = ['en', 'pl'];

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            // console.error(`QueryCache[${query.queryKey}]`, error);

            if (error.message === 'Network Error') {
                showErrorToast('Error connecting to server');
            }
            else if (error.status === 500) {
                showErrorToast('Server error');
            }
        }
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: true,
            retry: 0,
            staleTime: 5 * 1000,
            cacheTime: 120000
        },
    }
});
