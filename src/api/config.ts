import {GiphyFetch} from '@giphy/js-fetch-api';

export const environment = {
    'VITE_BORDO_API_URL': import.meta.env.VITE_BORDO_API_URL,
    'VITE_GIPHY_API_KEY': import.meta.env.VITE_GIPHY_API_KEY,
    'VITE_PUSHER_API_KEY': import.meta.env.VITE_PUSHER_API_KEY,
    'VITE_PUSHER_WS_HOST': import.meta.env.VITE_PUSHER_WS_HOST,
    'VITE_PUSHER_WS_PORT': import.meta.env.VITE_PUSHER_WS_PORT,
    'VITE_FIREBASE_PUBLIC_API_KEY': import.meta.env.VITE_FIREBASE_PUBLIC_API_KEY,
    'VITE_FIREBASE_PUBLIC_AUTH_DOMAIN': import.meta.env.VITE_FIREBASE_PUBLIC_AUTH_DOMAIN,
    'VITE_FIREBASE_PUBLIC_PROJECT_ID': import.meta.env.VITE_FIREBASE_PUBLIC_PROJECT_ID,
    'VITE_FIREBASE_PUBLIC_APP_ID': import.meta.env.VITE_FIREBASE_PUBLIC_APP_ID,
    'VITE_FIREBASE_PUBLIC_STORAGE_BUCKET': import.meta.env.VITE_FIREBASE_PUBLIC_STORAGE_BUCKET,
    'VITE_FIREBASE_PUBLIC_MESSAGING_SENDER_ID': import.meta.env.VITE_FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
    'VITE_FIREBASE_PUBLIC_MEASUREMENT_ID': import.meta.env.VITE_FIREBASE_PUBLIC_MEASUREMENT_ID,
};

const requiredBaseEnvVars = [
    'VITE_BORDO_API_URL',
    'VITE_GIPHY_API_KEY',
    'VITE_FIREBASE_PUBLIC_API_KEY',
    'VITE_FIREBASE_PUBLIC_AUTH_DOMAIN',
    'VITE_FIREBASE_PUBLIC_PROJECT_ID',
    'VITE_FIREBASE_PUBLIC_APP_ID',
    'VITE_FIREBASE_PUBLIC_STORAGE_BUCKET',
    'VITE_FIREBASE_PUBLIC_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_PUBLIC_MEASUREMENT_ID'
];

const requiredPusherEnvVars = [
    'VITE_PUSHER_API_KEY',
    'VITE_PUSHER_WS_HOST',
    'VITE_PUSHER_WS_PORT'
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

export const isPusherEnvSet  = requiredPusherEnvVars.every((key) => getEnvVar(key));

const giphyKey = getEnvVar('VITE_GIPHY_API_KEY');
export const giphyFetch = giphyKey ? new GiphyFetch(giphyKey) : null;
