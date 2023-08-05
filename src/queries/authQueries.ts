import { MutationKey, QueryKey } from '@tanstack/query-core';
import { UseMutationOptions } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosRequestConfig } from 'axios';

import { ApiClient } from '@/client';
import { showPasswordCreationRequiredDialog } from '@/components/DialogSystem/readyDialogs';
import { AxiosConfigs, getQueryInternal, postQueryInternal, putQueryInternal, QueryResponseError } from '@/queries/base';

const configProvider = () : AxiosRequestConfig => {
    return AxiosConfigs.WITH_CREDENTIALS_AND_CSRF;
};

export const authGetQuery = <ResponseDataType = any>(queryKey: QueryKey, endpoint: string) => {
    return (options?: UseQueryOptions<ResponseDataType>) => {
        return getQueryInternal<ResponseDataType>(ApiClient, queryKey, endpoint,
            configProvider, { ...options });
    };
};

export const authPostQuery = <Resp = any, Req = any>(mutationKey: MutationKey, endpoint: string) => {
    return (options?: UseMutationOptions<Resp, QueryResponseError, Req>) => {
        return postQueryInternal<Resp, QueryResponseError, Req>(
            ApiClient, mutationKey, endpoint, configProvider, {
                ...options,
                onError: (error: QueryResponseError, variables, recover) => {
                    const required = error?.status === 403 && error?.data?.['code'] === 'password_setup_required';

                    if (required) {
                        showPasswordCreationRequiredDialog();
                    }

                    options?.onError?.(error, variables, recover);
                }
            });
    };
};

export const authPutQuery = <ResponseDataType = any, ErrorType = QueryResponseError, RequestDataType = any>
(queryKey: QueryKey, endpoint: string) => {
    return (options?: UseMutationOptions<ResponseDataType, ErrorType, RequestDataType>) => {
        return putQueryInternal<ResponseDataType, ErrorType, RequestDataType>(ApiClient, queryKey, endpoint,
            configProvider, options);
    };
};
