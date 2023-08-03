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

export const AxiosConfigs = {
    // Do not send and receive cookies.
    NO_CREDENTIALS: { withCredentials: false },

    //Send and receive all cookies
    WITH_CREDENTIALS: { withCredentials: true },

    // Send and receive all cookies + CSRF token in the header.
    WITH_CREDENTIALS_AND_CSRF: {
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFTOKEN'
    },
};

export const getQueryInternal = <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(client: AxiosInstance, queryKey: TQueryKey, endpoint: string,
    config: AxiosRequestConfig,
    options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {

    return useQuery<TQueryFnData, TError, TData, TQueryKey>(queryKey,
        async (): Promise<TQueryFnData> => {
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
    config?: AxiosRequestConfig,
    options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
    >) => {

    return useMutation<TData, TError, TVariables, TContext>(mutationKey,
        async (data): Promise<TData> => {
            let response = null;

            try {
                config = config ? config : AxiosConfigs.WITH_CREDENTIALS_AND_CSRF;
                response = await client.post<TData>(endpoint, data, config);
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
            return response.data;
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
    config?: AxiosRequestConfig,
    options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
    >) => {

    return useMutation<TData, TError, TVariables, TContext>(mutationKey,
        async (data): Promise<TData> => {
            let response = null;

            try {
                config = config ? config : AxiosConfigs.WITH_CREDENTIALS_AND_CSRF;
                response = await client.put<TData>(endpoint, data, config);
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
            return response.data;
        }, options);
};