import { MutationKey, QueryKey } from '@tanstack/query-core';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type CustomError = {
    code: string;
    message: string;
}

export type FieldErrors = {
    [key: string]: CustomError[];
}

export type FormError = {
    non_field_errors?: CustomError[];
    field_errors?: FieldErrors;
}

export type QueryResponseErrorData = {
    form?: FormError;
}

export type QueryResponseError = {
    message: string;
    data: QueryResponseErrorData;
    status: number;
}

export const getQueryInternal = <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(client: AxiosInstance, queryKey: TQueryKey, endpoint: string,
    configProvider: () => Promise<AxiosRequestConfig>,
    options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {

    return useQuery<TQueryFnData, TError, TData, TQueryKey>(queryKey,
        async (): Promise<TQueryFnData> => {
            const config = await configProvider();
            if (!config?.headers?.['Authorization']) {
                return new Promise((resolve, reject) => {
                    reject('Authorization header is not set');
                });
            }
            let response = await client.get<TQueryFnData, AxiosResponse<TQueryFnData>, TData>(endpoint, config);
            return response.data;
        }, options);
};

export const postQueryInternal = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
>
(client: AxiosInstance,
    mutationKey: MutationKey,
    endpoint: string,
    configProvider: () => Promise<AxiosRequestConfig>,
    options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
    >) => {

    return useMutation<TData, TError, TVariables, TContext>(mutationKey,
        async (data): Promise<TData> => {
            try {
                const config = await configProvider();
                if (!config?.headers?.['Authorization']) {
                    return new Promise((resolve, reject) => {
                        reject('Authorization header is not set');
                    });
                }
                const response = await client.post<TData>(endpoint, data, config);
                return response.data;
            }
            catch (e) {
                const error = e as AxiosError<QueryResponseError>;
                const message = error.message;
                const response = error.response || {
                    data: {},
                    status: -1
                };
                const data = response.data;
                const status = response.status;
                throw { message, data, status } as QueryResponseError;
            }
        }, options);
};

export const putQueryInternal = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
>
(client: AxiosInstance,
    mutationKey: MutationKey,
    endpoint: string,
    configProvider: () => Promise<AxiosRequestConfig>,
    options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
    >) => {

    return useMutation<TData, TError, TVariables, TContext>(mutationKey,
        async (data): Promise<TData> => {
            try {
                const config = await configProvider();
                if (!config?.headers?.['Authorization']) {
                    return new Promise((resolve, reject) => {
                        reject('Authorization header is not set');
                    });
                }
                const response = await client.put<TData>(endpoint, data, config);
                return response.data;
            }
            catch (e) {
                const error = e as AxiosError<QueryResponseError>;
                const message = error.message;
                const response = error.response || {
                    data: {},
                    status: -1
                };
                const data = response.data;
                const status = response.status;
                throw { message, data, status } as QueryResponseError;
            }
        }, options);
};