import { MutationKey, QueryKey } from '@tanstack/query-core';
import { UseMutationOptions } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosRequestConfig } from 'axios';

import { ApiClient } from '@/client';
import { getQueryInternal, postQueryInternal, putQueryInternal } from '@/queries/base';

export const getQuery = <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(queryKey: TQueryKey, endpoint: string, configProvider: () => AxiosRequestConfig) => {
    return (options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'initialData'
    > & {
        initialData?: () => undefined
    }) => {
        return getQueryInternal<TQueryFnData, TError, TData, TQueryKey>(
            ApiClient, queryKey, endpoint, configProvider, options
        );
    };
};

export const postQuery = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
>(mutationKey: MutationKey, endpoint: string, configProvider: () => AxiosRequestConfig) => {
    return (options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
    >) => {
        return postQueryInternal<TData, TError, TVariables, TContext>(
            ApiClient, mutationKey, endpoint, configProvider, options
        );
    };
};

export const putQuery = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
>(mutationKey: MutationKey, endpoint: string, configProvider: () => AxiosRequestConfig) => {
    return (options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
    >) => {
        return putQueryInternal<TData, TError, TVariables, TContext>(
            ApiClient, mutationKey, endpoint, configProvider, options
        );
    };
};
