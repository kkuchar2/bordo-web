import {GiphyFetch} from '@giphy/js-fetch-api';

export const environment = {
    'BORDO_API_URL': process.env.BORDO_API_URL,
    'GIPHY_API_KEY': process.env.GIPHY_API_KEY,
    'PUSHER_API_KEY': process.env.PUSHER_API_KEY,
    'PUSHER_WS_HOST': process.env.PUSHER_WS_HOST,
    'PUSHER_WS_PORT': process.env.PUSHER_WS_PORT,
};

const requiredBaseEnvVars = [
    'BORDO_API_URL',
    'GIPHY_API_KEY'
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