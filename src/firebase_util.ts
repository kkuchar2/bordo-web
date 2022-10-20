import { getAnalytics } from 'firebase/analytics';
import {FirebaseApp, initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {getEnvVar} from './api/config';

const firebaseConfig = {
    apiKey: getEnvVar('FIREBASE_PUBLIC_API_KEY'),
    authDomain: getEnvVar('FIREBASE_PUBLIC_AUTH_DOMAIN'),
    projectId: getEnvVar('FIREBASE_PUBLIC_PROJECT_ID'),
    appId: getEnvVar('FIREBASE_PUBLIC_APP_ID'),
    storageBucket: getEnvVar('FIREBASE_PUBLIC_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('FIREBASE_PUBLIC_MESSAGING_SENDER_ID'),
    measurementId: getEnvVar('FIREBASE_PUBLIC_MEASUREMENT_ID'),
};

export const initFirebase = () => {
    if (firebaseConfig?.projectId) {
        // Initialize Firebase
        return initializeApp(firebaseConfig);
    }
    console.warn('Fail to initialize Firebase');
    return null;
};

export const initAnalytics = (app: FirebaseApp) => {
    if (app && app.name && typeof window !== 'undefined') {
        return getAnalytics(app);
    }
    return null;
};

export const initAuth = (app: FirebaseApp) => {
    if (app && app.name && typeof window !== 'undefined') {
        return getAuth(app);
    }
    return null;
};

const app = initFirebase();
const analytics = initAnalytics(app);
const auth = initAuth(app);

export {
    app,
    analytics,
    auth,
};