import {GiphyFetch} from '@giphy/js-fetch-api';

export const environment = {
    'BORDO_API_URL': process.env.BORDO_API_URL,
    'GIPHY_API_KEY': process.env.GIPHY_API_KEY,
    'PUSHER_API_KEY': process.env.PUSHER_API_KEY,
    'PUSHER_WS_HOST': process.env.PUSHER_WS_HOST,
    'PUSHER_WS_PORT': process.env.PUSHER_WS_PORT,
    'FIREBASE_PUBLIC_API_KEY': process.env.FIREBASE_PUBLIC_API_KEY,
    'FIREBASE_PUBLIC_AUTH_DOMAIN': process.env.FIREBASE_PUBLIC_AUTH_DOMAIN,
    'FIREBASE_PUBLIC_PROJECT_ID': process.env.FIREBASE_PUBLIC_PROJECT_ID,
    'FIREBASE_PUBLIC_APP_ID': process.env.FIREBASE_PUBLIC_APP_ID,
    'FIREBASE_PUBLIC_STORAGE_BUCKET': process.env.FIREBASE_PUBLIC_STORAGE_BUCKET,
    'FIREBASE_PUBLIC_MESSAGING_SENDER_ID': process.env.FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
    'FIREBASE_PUBLIC_MEASUREMENT_ID': process.env.FIREBASE_PUBLIC_MEASUREMENT_ID,
};

const requiredBaseEnvVars = [
    'BORDO_API_URL',
    'GIPHY_API_KEY',
    'FIREBASE_PUBLIC_API_KEY',
    'FIREBASE_PUBLIC_AUTH_DOMAIN',
    'FIREBASE_PUBLIC_PROJECT_ID',
    'FIREBASE_PUBLIC_APP_ID',
    'FIREBASE_PUBLIC_STORAGE_BUCKET',
    'FIREBASE_PUBLIC_MESSAGING_SENDER_ID',
    'FIREBASE_PUBLIC_MEASUREMENT_ID'
];

const requiredPusherEnvVars = [
    'PUSHER_API_KEY',
    'PUSHER_WS_HOST',
    'PUSHER_WS_PORT'
];

export const getEnvVar = (key: string): string => {
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
    console.error('Configuration of app is missing. Please contact the administrator.');
}

export const isPusherEnvSet  = requiredPusherEnvVars.every((key) => getEnvVar(key));

const giphyKey = getEnvVar('GIPHY_API_KEY');
export const giphyFetch = giphyKey ? new GiphyFetch(giphyKey) : null;