import { QueryKey } from '@tanstack/query-core';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import ApiClient from '../client';

import { checkPasswordRequired } from './util';

import { showErrorToast } from '@/components/Toast/readyToastNotifications';

export interface QueryResponseErrorData {

}

export interface QueryResponseError {
    message: string;
    data: QueryResponseErrorData;
    status: number;
}

export const CSRF_CONFIG = {
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN'
};

export const AxiosConfigs = {
    /**
     * Do not send and receive cookies.
     */
    NO_CREDENTIALS: { withCredentials: false },

    /**
     * Send and receive all cookies
     */
    WITH_CREDENTIALS: { withCredentials: true },

    /**
     * Send and receive all cookies.
     * Also, send CSRF token in the header and receive it as a cookie.
     */
    WITH_CREDENTIALS_AND_CSRF: { withCredentials: true, ...CSRF_CONFIG },
};

export const useGetQuery = <ResponseDataType>
(client: AxiosInstance,
    queryKey: QueryKey,
    endpoint: string,
    config: AxiosRequestConfig,
    options?: UseQueryOptions<ResponseDataType, QueryResponseError>) => {

    return useQuery<ResponseDataType, any>(queryKey,
        async (): Promise<ResponseDataType> => {
            let response = null;

            try {
                response = await client.get<ResponseDataType>(endpoint, config);
            }
            catch (e) {
                const error = e as AxiosError<QueryResponseError>;
                const message = error.message;
                const data = error.response.data;
                const status = error.response.status;
                throw { message, data, status } as QueryResponseError;
            }
            return response.data;
        }, options);
};

export const usePostQuery = <ResponseDataType = any, RequestDataType = any>
(client: AxiosInstance,
    queryKey: QueryKey,
    endpoint: string,
    config?: AxiosRequestConfig,
    options?: UseMutationOptions<ResponseDataType, QueryResponseError, RequestDataType>) => {

    return useMutation<ResponseDataType, QueryResponseError, RequestDataType>(queryKey,
        async (data): Promise<ResponseDataType> => {
            let response = null;

            try {
                config = config ? config : AxiosConfigs.WITH_CREDENTIALS_AND_CSRF;
                response = await client.post<ResponseDataType>(endpoint, data, config);
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

export const usePutQuery = <ResponseDataType = any, ErrorType = QueryResponseError, RequestDataType = any>(client: AxiosInstance,
    queryKey: QueryKey,
    endpoint: string,
    config: AxiosRequestConfig,
    options?: UseMutationOptions<ResponseDataType, ErrorType, RequestDataType>) => {
    return useMutation<ResponseDataType, ErrorType, RequestDataType>(queryKey,
        async (data): Promise<ResponseDataType> => await client.put(endpoint, data, config), options);
};

export const makeGet = <T>(queryKey: QueryKey, endpoint: string, config: AxiosRequestConfig) => {
    return (options?: UseQueryOptions<T>) => {
        return useGetQuery<T>(ApiClient, queryKey, endpoint, config, options);
    };
};

export const makePost = <ResponseDataType = any, RequestDataType = any>(queryKey: QueryKey, endpoint: string, config: AxiosRequestConfig) => {
    return (options?: UseMutationOptions<ResponseDataType, unknown, RequestDataType>) => {
        return usePostQuery<ResponseDataType, RequestDataType>(ApiClient, queryKey, endpoint, config, options);
    };
};

export const authGet = <ResponseDataType = any>(queryKey: QueryKey, endpoint: string) => {
    return (options?: UseQueryOptions<ResponseDataType>) => {
        return useGetQuery<ResponseDataType>(ApiClient, queryKey, endpoint,
            { ...AxiosConfigs.WITH_CREDENTIALS_AND_CSRF }, {
                ...options,
                onError: (error: QueryResponseError) => {
                    if (error.message === 'Network Error') {
                        showErrorToast('Error connecting to server');
                    }
                    else if (error.status === 500) {
                        showErrorToast('Server error');
                    }
                    options?.onError?.(error);
                }
            });
    };
};

export const authPost = <ResponseDataType = any, RequestDataType = any>(queryKey: QueryKey, endpoint: string, config?: AxiosRequestConfig) => {
    return (options?: UseMutationOptions<ResponseDataType, QueryResponseError, RequestDataType>) => {
        return usePostQuery<ResponseDataType, RequestDataType>(ApiClient, queryKey, endpoint, config, {
            ...options,
            onError: (error: QueryResponseError, variables, recover) => {
                if (error.message === 'Network Error') {
                    showErrorToast('Error connecting to server');
                }
                else if (error.status === 500) {
                    showErrorToast('Server error');
                }

                checkPasswordRequired(error);

                options?.onError?.(error, variables, recover);
            }
        });
    };
};

export const authPut = <ResponseDataType = any, ErrorType = QueryResponseError, RequestDataType = any>(queryKey: QueryKey, endpoint: string) => {
    return (options?: UseMutationOptions<ResponseDataType, ErrorType, RequestDataType>) => {
        return usePutQuery<ResponseDataType, ErrorType, RequestDataType>(ApiClient, queryKey, endpoint,
            { ...AxiosConfigs.WITH_CREDENTIALS_AND_CSRF }, options);
    };
};
