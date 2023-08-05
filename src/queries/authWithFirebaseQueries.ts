import { MutationKey, QueryKey } from '@tanstack/query-core';
import { UseMutationOptions } from '@tanstack/react-query';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query/src/types';
import { AxiosRequestConfig } from 'axios';

import { ApiClientWithFirebase } from '@/client';
import { getQueryInternal, postQueryInternal, QueryResponseError } from '@/queries/base';

const configProvider = () : AxiosRequestConfig => {
    const token = localStorage.getItem('firebase_token');

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

export const getQueryFirebase = <ResponseDataType = any>(queryKey: QueryKey, endpoint: string) => {
    return (options?: UseQueryOptions<ResponseDataType>) : UseQueryResult<ResponseDataType> => {
        return getQueryInternal<ResponseDataType>(ApiClientWithFirebase, queryKey,
            endpoint, configProvider, { ...options });
    };
};

export const postQueryFirebase = <Resp = any, Req = any>(mutationKey: MutationKey, endpoint: string) => {
    return (options?: UseMutationOptions<Resp, QueryResponseError, Req>) => {
        return postQueryInternal<Resp, QueryResponseError, Req>(ApiClientWithFirebase,
            mutationKey, endpoint, configProvider, { ...options, });
    };
};