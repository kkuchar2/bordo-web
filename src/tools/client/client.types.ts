import {AnyAction} from '@reduxjs/toolkit';
import {AxiosInstance, AxiosRequestConfig} from 'axios';
import {SchemaOf} from 'yup';

export enum RequestStatus {
    Unknown = 'UNKNOWN',
    Waiting = 'WAITING',
    Success = 'SUCCESS',
    Failure = 'FAILED'
}

export enum RequestType {
    GET = 'GET',
    POST = 'POST',
    POST_FILE = 'POST_FILE',
    PATCH_FILE = 'PATCH_FILE',
    PUT_FILE = 'PUT_FILE',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export interface Error {
    statusCode: string;
    detail: any;
}

export interface Errors {
    requestError?: Error;
    responseError?: Error;
}

export interface ResponseArgs<T = any> {
    info: {
        url: string;
        status: RequestStatus,
        requestData: object,
        httpCode: number,
        errors: Errors;
    }
    responseData?: T | undefined;
}

export const DefaultResponseArgs = <T>() => {
    return {
        info: {
            url: '',
            status: RequestStatus.Unknown,
            httpCode: 0,
            requestData: undefined,
            errors: {}
        },
        responseData: undefined
    } as ResponseArgs<T>;
};

export interface RequestArgs<T = any, D = any, ResponseSchemaType = any> {
    axiosInstance: AxiosInstance,
    url: string;
    config?: AxiosRequestConfig<D>;
    requestData?: D;
    requestType: RequestType;
    file?: File,
    filePropertyName?: string;
    action: (params: ResponseArgs<T>) => AnyAction;
    responseSchema?: SchemaOf<ResponseSchemaType>
}
