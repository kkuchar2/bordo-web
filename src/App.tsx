import React from 'react';

import {QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from 'state/store';

import ContentWithRouter from './ContentWithRouter';
import { useI18n } from 'hooks/useI18n';
import { useEnvironment } from 'hooks/useEnvironment';

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
    const translationsLoaded = useI18n();
    const environmentLoaded = useEnvironment();

    if (!translationsLoaded || !environmentLoaded) {
        return null;
    }

    return <Provider store={store}>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                {process.env.NODE_ENV === 'development' &&
                    <ReactQueryDevtools initialIsOpen={false} position={'top-right'}/>}
                <ContentWithRouter/>
            </QueryClientProvider>
        </BrowserRouter>
    </Provider>;
};
