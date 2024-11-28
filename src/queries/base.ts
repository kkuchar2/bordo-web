import { MutationKey, QueryKey, useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type FieldError = {
    field: string;
    code: string;
    message: string;
}

export type NonFieldError = {
    code: string;
    message: string;
}

export type FieldErrorsMap = {
    [key: string]: FieldError[];
}

export type ValidationResponse = {
    fieldErrors: FieldErrorsMap;
    nonFieldErrors: NonFieldError[];
}

export type QueryResponseError = {
    code?: string;
    message: string;
    status?: number;
    timestamp?: string;
    route?: string;
    validationResponse?: ValidationResponse;
}

export const AxiosConfigs = {
    // Do not send and receive cookies.
    NO_CREDENTIALS: { withCredentials: false },

    //Send and receive all cookies
    WITH_CREDENTIALS: { withCredentials: true },

    WITH_CREDENTIALS_NO_COOKIES_SENT: {
        withCredentials: true,
        headers: {
            'Cookie': ''
        }
    },

    // Send and receive all cookies + CSRF token in the header.
    WITH_CREDENTIALS_AND_CSRF: {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    },
};

const defaultError: QueryResponseError = {
    message: 'Unknown error',
    timestamp: new Date().toISOString()
};

const parseError = (e: unknown) : QueryResponseError | null => {
    if (axios.isAxiosError(e)) {
        const error = e as AxiosError<QueryResponseError>;

        const errorResponse = error.response;

        console.log('errorResponse', errorResponse);

        if (!errorResponse) {
            console.log('No error response');
            return defaultError;
        }

        const data = errorResponse.data;

        console.log('data', data);

        if (!data) {
            console.log('No data');
            return {
                status: errorResponse.status,
                message: 'Unknown error',
                timestamp: new Date().toISOString()
            };
        }

        const queryResponseError = data as QueryResponseError;

        console.log('queryResponseError', queryResponseError);

        return queryResponseError;
    }
    return defaultError;
};

export const getQueryInternal = <TResponse = unknown, TError = unknown, TData = TResponse, TQueryKey extends QueryKey = QueryKey>
    (
        client: AxiosInstance,
        queryKey: TQueryKey,
        route: string,
        axiosConfigProvider: () => AxiosRequestConfig,
        options?: UseQueryOptions<TResponse, TError, TData, TQueryKey>
    ) => {
    return useQuery<TResponse, TError, TData, TQueryKey>({
        queryKey,
        queryFn: async (): Promise<TResponse> => {
            try {
                return (await client.get<TResponse, AxiosResponse<TResponse>, TData>(route, axiosConfigProvider())).data;
            }
            catch (e: unknown) {
                throw parseError(e);
            }
        },
        ...options
    });
};

export const postQueryInternal = <TResponse = unknown, TError = unknown, TVariables = void>
    (
        client: AxiosInstance,
        mutationKey: MutationKey,
        route: string,
        axiosConfigProvider: () => AxiosRequestConfig,
        options?: UseMutationOptions<TResponse, TError, TVariables>
    ) => {
    return useMutation<TResponse, TError, TVariables>({
        mutationKey: mutationKey,
        mutationFn: async (data): Promise<TResponse> => {
            try {
                return (await client.post<TResponse>(route, data, axiosConfigProvider())).data;
            }
            catch (e: unknown) {
                throw parseError(e);
            }
        },
        ...options
    });
};

export const putQueryInternal = <TResponse = unknown, TError = unknown, TVariables = void>
    (
        client: AxiosInstance,
        mutationKey: MutationKey,
        route: string,
        axiosConfigProvider: () => AxiosRequestConfig,
        options?: UseMutationOptions<TResponse, TError, TVariables>
    ) => {
    return useMutation<TResponse, TError, TVariables>({
        mutationKey: mutationKey,
        mutationFn: async (data): Promise<TResponse> => {
            try {
                return (await client.put<TResponse>(route, data, axiosConfigProvider())).data;
            }
            catch (e) {
                throw parseError(e);
            }
        },
        ...options
    });
};

export const patchQueryInternal = <TResponse = unknown, TError = unknown, TVariables = void>
    (
        client: AxiosInstance,
        mutationKey: MutationKey,
        route: string,
        axiosConfigProvider: () => AxiosRequestConfig,
        options?: UseMutationOptions<TResponse, TError, TVariables>
    ) => {
    return useMutation<TResponse, TError, TVariables>({
        mutationKey: mutationKey,
        mutationFn: async (data): Promise<TResponse> => {
            try {
                return (await client.patch<TResponse>(route, data, axiosConfigProvider())).data;
            }
            catch (e) {
                throw parseError(e);
            }
        },
        ...options
    });
};

export const deleteQueryInternal = <TResponse = unknown, TError = unknown, TVariables = void>
    (
        client: AxiosInstance,
        mutationKey: MutationKey,
        route: string,
        axiosConfigProvider: () => AxiosRequestConfig,
        options?: UseMutationOptions<TResponse, TError, TVariables>
    ) => {
    return useMutation<TResponse, TError, TVariables>({
        mutationKey: mutationKey,
        mutationFn: async (): Promise<TResponse> => {
            try {
                return (await client.delete<TResponse>(route, axiosConfigProvider())).data;
            }
            catch (e) {
                throw parseError(e);
            }
        },
        ...options
    });
};