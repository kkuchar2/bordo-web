// noinspection SpellCheckingInspection

import { GiphyFetch } from '@giphy/js-fetch-api';
import { QueryCache, QueryClient } from '@tanstack/react-query';

import { showErrorToast } from '@/components/Toast/readyToastNotifications';

export const environment : Record<string, string | undefined> = {
    'NEXT_PUBLIC_BORDO_API_URL': process.env.NEXT_PUBLIC_BORDO_API_URL,
    'NEXT_PUBLIC_GIPHY_API_KEY': process.env.NEXT_PUBLIC_GIPHY_API_KEY,
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID': process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    'NEXT_PUBLIC_USE_FIREBASE_AUTH': process.env.NEXT_PUBLIC_USE_FIREBASE_AUTH || 'false',
    'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getEnvVar = (key: string): any => {
    if (key in environment) {
        return environment[key];
    }
    return null;
};

export const missingEnvVars : string[] = [];

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

export const isFirebaseAuthEnabled = getEnvVar('NEXT_PUBLIC_USE_FIREBASE_AUTH') === 'true';

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
