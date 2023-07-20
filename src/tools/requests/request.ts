import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Dispatch } from 'redux';

import { RequestArgs, RequestType } from '../client/client.types';
import {
    composeUrl,
    createFormDataFromFile,
    dispatchOnBefore,
    dispatchRequestError,
    dispatchResponseError,
    dispatchSuccess
} from '../client/client.utils';

export const makeAxiosRequest = async <T = any>(args: RequestArgs): Promise<AxiosResponse<T>> => {

    const {
        axiosInstance,
        url,
        config,
        requestData,
        requestType,
        file,
        filePropertyName
    } = args;

    if (requestType === RequestType.GET) {
        return await axiosInstance.get<T>(composeUrl(url, requestData), config);
    }
    else if (requestType === RequestType.POST) {
        return await axiosInstance.post<T>(url, requestData, config);
    }
    else if (requestType === RequestType.POST_FILE) {
        return await axiosInstance.post<T>(url, createFormDataFromFile(file, requestData, filePropertyName), config);
    }
    else if (requestType === RequestType.PATCH_FILE) {
        return await axiosInstance.patch<T>(url, createFormDataFromFile(file, requestData, filePropertyName), config);
    }
    else if (requestType === RequestType.PUT_FILE) {
        return await axiosInstance.put<T>(url, createFormDataFromFile(file, requestData, filePropertyName), config);
    }
    else if (requestType === RequestType.PUT) {
        return await axiosInstance.put<T>(url, requestData, config);
    }
    else if (requestType === RequestType.PATCH) {
        return await axiosInstance.patch<T>(url, requestData, config);
    }
    else if (requestType === RequestType.DELETE) {
        return await axiosInstance.delete<T>(url, config);
    }
};

export const request = <T = any>(args: RequestArgs) => {

    const { url, action, requestData, responseSchema } = args;

    return async (dispatch: Dispatch) => {

        dispatchOnBefore(dispatch, action, url, requestData);

        try {
            const response = await makeAxiosRequest<T>(args);

            if (responseSchema) {
                const { data } = response;

                try {
                    await responseSchema.validate(data);
                    dispatchSuccess(dispatch, action, args, response);
                }
                catch (err) {
                    dispatchResponseError(dispatch, args, err.errors, StatusCodes.UNPROCESSABLE_ENTITY);
                }
            }
            else {
                dispatchSuccess(dispatch, action, args, response);
            }
        }
        catch (e) {
            if (e.message === 'Network Error') {
                dispatchRequestError(dispatch, args, StatusCodes.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE');
            }
            else if (!e.response) {
                dispatchRequestError(dispatch, args, StatusCodes.NO_CONTENT, 'NO_RESPONSE');
            }
            else {
                dispatchResponseError(dispatch, args, e.response.data, e.response.status);
            }
        }
    };
};
