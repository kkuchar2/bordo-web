import React, {useEffect, useState} from 'react';

import {QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from 'state/store';

import './i18n';
import { missingEnvVars} from './api/config';
import ContentWithRouter from './ContentWithRouter';
import i18n from './i18n';

import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

export const SUPPORTED_LANGUAGES = ['en', 'pl'];

export const queryClient = new QueryClient({
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

export const App = () => {
    const [translationsLoaded, setTranslationsLoaded] = useState(false);
    const [environmentLoaded, setEnvironmentLoaded] = useState(false);

    useEffect(() => {
        if (missingEnvVars.length === 0) {
            setEnvironmentLoaded(true);
        }

        const lang = localStorage.getItem('i18nextLng');
        i18n
            .init({
                lng: lang,
                backend: {
                    loadPath: '{{ns}}/{{lng}}.json'
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
                ns: ['assets/translation'],
                defaultNS: 'assets/translation',
                fallbackLng: 'en',
                keySeparator: false,
                interpolation: {
                    escapeValue: false,
                    formatSeparator: ','
                }
            })
            .then(() => {
                setTranslationsLoaded(true);
            });

    }, []);

    if (!translationsLoaded || !environmentLoaded) {
        return null;
    }

    return <Provider store={store}>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} position={'top-right'}/>
                <ContentWithRouter/>
            </QueryClientProvider>
        </BrowserRouter>
    </Provider>;
};
