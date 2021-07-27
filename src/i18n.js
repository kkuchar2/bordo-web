import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'pl',
        backend: {
            /* translation file path */
            loadPath: '{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        debug: true,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    });

export default i18n;