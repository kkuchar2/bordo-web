import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'en',
        backend: {
            loadPath: '{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        debug: false,
        ns: ['assets/translation'],
        defaultNS: 'assets/translation',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        }
    }).then(r => {});

export default i18n;