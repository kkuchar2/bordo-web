import {AnyAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {Dispatch} from 'redux';

import {RequestArgs, RequestStatus, ResponseArgs} from './client.types';

export const statusCodeOf = (code: number) => {
    let keys = Object.keys(StatusCodes).filter(x => StatusCodes[x] == code);
    return keys.length > 0 ? keys[0] : null;
};

export const dispatchRequestError = (
    dispatch: Dispatch,
    requestArgs: RequestArgs,
    statusCode: number,
    message?: string,
) => {
    const { url, requestData, action } = requestArgs;

    dispatch(
        action({
            info: {
                status: RequestStatus.Failure,
                url: url,
                requestData: requestData,
                httpCode: statusCode,
                errors: {
                    requestError: { statusCode: statusCodeOf(statusCode), detail: message },
                }
            }
        }),
    );
};

export const dispatchResponseError = (
    dispatch: Dispatch,
    requestArgs: RequestArgs,
    responseData: any,
    statusCode: number
) => {
    const { url, requestData, action } = requestArgs;

    dispatch(
        action({
            info: {
                status: RequestStatus.Failure,
                url: url,
                requestData: requestData,
                httpCode: statusCode,
                errors: {
                    responseError: {
                        statusCode: statusCodeOf(statusCode),
                        detail: responseData ? responseData : undefined
                    }
                }
            }
        }),
    );
};

export const dispatchSuccess = (
    dispatch: Dispatch,
    action: (params: ResponseArgs) => AnyAction,
    requestArgs: RequestArgs,
    responseData: AxiosResponse | null | undefined,
) => dispatch(action({
    info: {
        url: requestArgs.url,
        status: RequestStatus.Success,
        requestData: requestArgs.requestData,
        httpCode: responseData ? responseData.status : -1,
        errors: {},
    },
    responseData: !responseData ? {} : responseData.data
}));

export const dispatchOnBefore = (
    dispatch: Dispatch,
    action: (params: ResponseArgs) => AnyAction,
    url: string,
    requestData: object
) => {
    dispatch(action({
        info: {
            url: url,
            status: RequestStatus.Waiting,
            requestData: requestData,
            httpCode: -1,
            errors: {}
        },
        responseData: null,
    }));
};

export const createFormDataFromFile = (file: File, requestData: object, propertyName: string) => {
    const formData = new FormData();
    formData.append(propertyName, file);
    if (requestData) {
        Object.keys(requestData).forEach(key => formData.append(key, requestData[key]));
    }
    return formData;
};

export const composeUrl = (url: string, requestData: object) => {
    let parametrizedUrl = url;

    for (const [key, value] of Object.entries(requestData)) {
        parametrizedUrl += `?${key}=${value}`;
    }

    return parametrizedUrl;
};
