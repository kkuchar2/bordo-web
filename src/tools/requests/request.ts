import {error_style, success_style} from "appRedux/middleware/logger";
import {AxiosInstance, AxiosResponse} from "axios";
import {StatusCodes} from "http-status-codes";
import {Dispatch} from "redux";
import Cookies from "universal-cookie";

import {RequestArgs, RequestType} from "../client/client.types";
import {
    composeUrl,
    createFormDataFromFile,
    dispatchResponseError,
    dispatchOnBefore,
    dispatchSuccess, dispatchRequestError
} from "../client/client.utils";

export const makeAxiosRequest = async <T = any> (args : RequestArgs) : Promise<AxiosResponse<T>> => {

    const {
        axiosInstance,
        url,
        config,
        requestData,
        requestType,
        file,
        filePropertyName,
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

const refreshToken = async <T = any> (axiosInstance: AxiosInstance) : Promise<AxiosResponse<T>> => {
    return await makeAxiosRequest<T>({
        requestType: RequestType.POST,
        url: "account/token/refresh",
        action: null,
        axiosInstance: axiosInstance,
        config: {
            withCredentials: true,
            headers: {
                "X-CSRFTOKEN": new Cookies().get("csrftoken"),
            }
        },
        requestData: {},
    });
};

export const request = <T = any> (args: RequestArgs) => {

    const { axiosInstance, url, action, requestData, refreshTokenOnUnauthorized } = args;

    return async (dispatch: Dispatch) => {

        dispatchOnBefore(dispatch, action, url, requestData);

        try {
            dispatchSuccess(dispatch, action, args, await makeAxiosRequest<T>(args));
        } catch (e) {
            console.log(e);
            if (e.message === "Network Error") {
                dispatchRequestError(dispatch, args, StatusCodes.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE');
            }
            else if (!e.response)
            {
                dispatchRequestError(dispatch, args,  StatusCodes.NO_CONTENT, 'NO_RESPONSE');
            }
            else if (e.response.status === 401 && refreshTokenOnUnauthorized) {
                try {
                    console.log(`%c Refreshing token`, success_style);
                    await refreshToken(axiosInstance);

                    try {
                        dispatchSuccess(dispatch, action, args, await makeAxiosRequest<T>(args));
                    }
                    catch (e) {
                        console.log(`%c Hey at least we tried`, error_style);

                        if (e.message === "Network Error") {
                            dispatchRequestError(dispatch, args, StatusCodes.SERVICE_UNAVAILABLE,  'SERVICE_UNAVAILABLE');
                        }
                        else if (!e.response) {
                            dispatchRequestError(dispatch, args, StatusCodes.NO_CONTENT, 'NO_RESPONSE');
                        }
                        else {
                            dispatchResponseError(dispatch, args, e.response, e.response.status);
                        }
                    }
                }
                catch (e) {
                    dispatchResponseError(dispatch, args, 'UNAUTHORIZED', StatusCodes.UNAUTHORIZED);
                }
            }
            else {
                dispatchResponseError(dispatch, args, e.response.data, e.response.status);
            }
        }
    };
};
