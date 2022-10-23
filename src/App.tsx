import React from 'react';

import {QueryClient,} from '@tanstack/react-query';

import './i18n';

import './index.css';

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
    // const [translationsLoaded, setTranslationsLoaded] = useState(false);
    // const [environmentLoaded, setEnvironmentLoaded] = useState(false);
    //
    // useEffect(() => {
    //     if (analytics) {
    //         logEvent(analytics, 'hello_there');
    //     }
    //
    //     if (missingEnvVars.length === 0) {
    //         setEnvironmentLoaded(true);
    //     }
    //
    //     const lang = localStorage.getItem('i18nextLng');
    //     i18n
    //         .init({
    //             lng: lang,
    //             backend: {
    //                 loadPath: '{{ns}}/{{lng}}.json'
    //             },
    //             saveMissing: false,
    //             parseMissingKeyHandler: (key: string) => {
    //                 return `NO_TRANSLATION__${key}`;
    //             },
    //             preload: SUPPORTED_LANGUAGES,
    //             react: {
    //                 useSuspense: false
    //             },
    //             debug: false,
    //             ns: ['assets/translation'],
    //             defaultNS: 'assets/translation',
    //             fallbackLng: 'en',
    //             keySeparator: false,
    //             interpolation: {
    //                 escapeValue: false,
    //                 formatSeparator: ','
    //             }
    //         })
    //         .then(() => {
    //             setTranslationsLoaded(true);
    //         });
    //
    // }, []);
    //
    // if (!translationsLoaded || !environmentLoaded) {
    //     return null;
    // }

    return <div>
        <div className={'w-[50px] h-[50px] bg-red-500'} />
        {/*<BrowserRouter>*/}
        {/*    <QueryClientProvider client={queryClient}>*/}
        {/*        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} position={'top-right'}/>}*/}
        {/*        <ContentWithRouter/>*/}
        {/*    </QueryClientProvider>*/}
        {/*</BrowserRouter>*/}
    </div>;
};
