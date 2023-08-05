import { MutationKey, QueryKey } from '@tanstack/query-core';
import { UseMutationOptions } from '@tanstack/react-query';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query/src/types';

import { ApiClientWithFirebase } from '@/client';
import { getQueryInternal, postQueryInternal, QueryResponseError } from '@/queries/base';

export const getQueryFirebase = <ResponseDataType = any>(queryKey: QueryKey, endpoint: string) => {
    return (options?: UseQueryOptions<ResponseDataType>) : UseQueryResult<ResponseDataType> => {

        const token = localStorage.getItem('firebase_token');

        const config = {
            headers: {}
        };

        if (token) {
            config['headers'] = {
                Authorization: `Bearer ${token}`
            };
        }

        return getQueryInternal<ResponseDataType>(ApiClientWithFirebase, queryKey,
            endpoint, config, { ...options });
    };
};

export const postQueryFirebase = <Resp = any, Req = any>(mutationKey: MutationKey, endpoint: string) => {
    return (options?: UseMutationOptions<Resp, QueryResponseError, Req>) => {

        const token = localStorage.getItem('firebase_token');

        const config = {
            headers: {}
        };

        if (token) {
            config['headers'] = {
                Authorization: `Bearer ${token}`
            };
        }

        return postQueryInternal<Resp, QueryResponseError, Req>(ApiClientWithFirebase,
            mutationKey, endpoint, config, { ...options, });
    };
};