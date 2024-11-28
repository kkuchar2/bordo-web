import { MutationKey, QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

import { ApiClient } from '@/client';
import { AxiosConfigs, getQueryInternal, postQueryInternal, putQueryInternal } from '@/queries/base';

export const getQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>
    (
        key: QueryKey,
        endpoint: string
    ) => {
    return (options?: UseQueryOptions<TQueryFnData, TError, TData>) => {
        return getQueryInternal<TQueryFnData, TError, TData, QueryKey>
        (
            ApiClient,
            key,
            endpoint,
            () => AxiosConfigs.NO_CREDENTIALS,
            options
        );
    };
};

export const authGetQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>
    (
        key: QueryKey,
        endpoint: string
    ) => {
    return (options?: UseQueryOptions<TQueryFnData, TError, TData>) => {
        return getQueryInternal<TQueryFnData, TError, TData, QueryKey>
        (
            ApiClient,
            key,
            endpoint,
            () => AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
            options
        );
    };
};

export const postQuery = <TData = unknown, TError = unknown, TVariables = void>
    (
        key: MutationKey,
        endpoint: string
    ) => {
    return (options?: UseMutationOptions<TData, TError, TVariables>) => {
        return postQueryInternal<TData, TError, TVariables>
        (
            ApiClient,
            key,
            endpoint,
            () => AxiosConfigs.NO_CREDENTIALS,
            options
        );
    };
};

export const authPostQuery = <TResponseData = unknown, TError = unknown, TRequestData = void>
    (
        key: MutationKey,
        endpoint: string
    ) => {
    return (options?: UseMutationOptions<TResponseData, TError, TRequestData>) => {
        return postQueryInternal<TResponseData, TError, TRequestData>
        (
            ApiClient,
            key,
            endpoint,
            () => AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
            options
        );
    };
};

export const putQuery = <TData = unknown, TError = unknown, TVariables = void>
    (
        key: MutationKey,
        endpoint: string
    ) => {
    return (options?: UseMutationOptions<TData, TError, TVariables>) => {
        return putQueryInternal<TData, TError, TVariables>
        (
            ApiClient,
            key,
            endpoint,
            () => AxiosConfigs.NO_CREDENTIALS,
            options
        );
    };
};

export const authPutQuery = <TData = unknown, TError = unknown, TVariables = void>
    (
        key: MutationKey,
        endpoint: string
    ) => {
    return (options?: UseMutationOptions<TData, TError, TVariables>) => {
        return putQueryInternal<TData, TError, TVariables>
        (
            ApiClient,
            key,
            endpoint,
            () => AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
            options
        );
    };
};