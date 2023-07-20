'use client';

import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { queryClient } from '@/config';
import { ContentWithChakra } from '@/ContentWithChakra';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useI18n } from '@/hooks/useI18n';
import { store } from '@/state/store';

type ContentProps = {
    children: ReactNode;
}

export const Content = (props: ContentProps) => {

    const translationsLoaded = useI18n();
    const environmentLoaded = useEnvironment();

    if (!translationsLoaded || !environmentLoaded) {
        return null;
    }

    return <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <ContentWithChakra>
                {props.children}
            </ContentWithChakra>
        </QueryClientProvider>
    </Provider>;
};