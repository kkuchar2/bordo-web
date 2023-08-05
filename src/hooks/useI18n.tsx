import { useEffect, useState } from 'react';

import i18n from '../i18n';

import { SUPPORTED_LANGUAGES } from '@/config';

export const useI18n = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'en';

        i18n
            .init({
                lng: lang,
                backend: {
                    loadPath: '/locales/{{lng}}.json'
                },
                saveMissing: false,
                parseMissingKeyHandler: (key: string) => {
                    return `NO_TRANSLATION__${key}`;
                },
                preload: SUPPORTED_LANGUAGES,
                react: {
                    useSuspense: false
                },
                debug: false,
                fallbackLng: 'en',
                keySeparator: false,
                interpolation: {
                    escapeValue: false,
                    formatSeparator: ','
                }
            })
            .then(() => {
                setLoaded(true);
            });
    }, []);

    return loaded;
};
