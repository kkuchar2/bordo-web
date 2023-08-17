import { getAuth } from '@firebase/auth';
import { MutationKey, QueryKey } from '@tanstack/query-core';
import { UseMutationOptions } from '@tanstack/react-query';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query/src/types';
import { AxiosRequestConfig } from 'axios';

import { ApiClientWithFirebase } from '@/client';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { getQueryInternal, postQueryInternal, putQueryInternal, QueryResponseError } from '@/queries/base';

const defaultConfigProvider = async () : Promise<AxiosRequestConfig> => {
    const app = initializeFirebase();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const token = firebaseUser ? await firebaseUser.getIdToken(true) : null;

    const config : AxiosRequestConfig = {
        headers: {}
    };

    if (token) {
        config['headers'] = {
            Authorization: `Bearer ${token}`
        };
    }
    return config;
};

export const getQueryFirebase = <ResponseDataType = any>(
    queryKey: QueryKey, endpoint: string, configProvider: () => Promise<AxiosRequestConfig> = defaultConfigProvider
) => {
    return (options?: UseQueryOptions<ResponseDataType>) : UseQueryResult<ResponseDataType> => {
        return getQueryInternal<ResponseDataType>(ApiClientWithFirebase, queryKey,
            endpoint, configProvider, { ...options });
    };
};

export const postQueryFirebase = <Resp = any, Req = any>(
    mutationKey: MutationKey, endpoint: string, configProvider: () => Promise<AxiosRequestConfig> = defaultConfigProvider
) => {
    return (options?: UseMutationOptions<Resp, QueryResponseError, Req>) => {
        return postQueryInternal<Resp, QueryResponseError, Req>(ApiClientWithFirebase,
            mutationKey, endpoint, configProvider, { ...options, });
    };
};

export const putQueryFirebase = <Resp = any, Req = any>(
    mutationKey: MutationKey, endpoint: string, configProvider: () => Promise<AxiosRequestConfig> = defaultConfigProvider
) => {
    return (options?: UseMutationOptions<Resp, QueryResponseError, Req>) => {
        return putQueryInternal<Resp, QueryResponseError, Req>(ApiClientWithFirebase,
            mutationKey, endpoint, configProvider, { ...options, });
    };
};