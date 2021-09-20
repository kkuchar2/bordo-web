import {
    createSlice,
    Dictionary,
    PayloadAction,
    Slice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import {sendFilePost, sendGet, sendPost} from "axios-client-wrapper";

export interface IResponsePayload {
    path: string;
    errors: any;
    data: any;
}

export enum RequestStatus {
    Unknown,
    Waiting,
    Success,
    Failure,
}

export interface RequestState {
    pending: boolean;
    status: RequestStatus;
}

export interface BaseRequestSliceState {
    path: string;
    requestState: RequestState;
    responseData: Dictionary<any>;
    errors: Array<string>;
}

export interface BeforeRequestPayload {
    path: string;
}

export const createBaseRequestSlice = <Reducers extends SliceCaseReducers<BaseRequestSliceState>>({
                                                                                                      name = "",
                                                                                                      reducers,
                                                                                                  }: {
    name: string;
    reducers?: ValidateSliceCaseReducers<BaseRequestSliceState, Reducers>;
}) => {
    return createSlice({
        name,
        initialState: {
            path: "",
            requestState: { pending: false, status: RequestStatus.Unknown },
            responseData: {},
            errors: [],
        } as BaseRequestSliceState,
        reducers: {
            onRequestSent: (state, action: PayloadAction<BeforeRequestPayload>) => {
                const { path = "" } = action.payload ? action.payload : {};
                state.requestState = { pending: true, status: RequestStatus.Waiting };
                state.path = path;
            },
            onRequestSuccess: (state, action: PayloadAction<IResponsePayload>) => {
                const { errors = [], path = "", data = {} } = action.payload ? action.payload : {};
                state.errors = errors;
                state.path = path;
                state.requestState = { pending: false, status: RequestStatus.Success };
                state.responseData = data;
            },
            onRequestFailed: (state: BaseRequestSliceState, action: PayloadAction<IResponsePayload>) => {
                const { errors = [], path = "", data = {} } = action.payload ? action.payload : {};
                state.path = path;
                state.requestState = { pending: false, status: RequestStatus.Failure };
                state.responseData = data;
                state.errors = errors;
            },
            onReset: (state: BaseRequestSliceState) => {
                state.path = "";
                state.requestState = { pending: false, status: RequestStatus.Unknown };
                state.responseData = {};
                state.errors = [];
            },
            ...reducers,
        },
    });
};

export const sendPostRequest = (
    apiUrl: string,
    path: string,
    body: object,
    withAuthentication: boolean,
    slice: Slice<BaseRequestSliceState>,
) => {
    return sendPost({
        apiUrl: apiUrl,
        path: path,
        onBefore: slice.actions.onRequestSent,
        onSuccess: slice.actions.onRequestSuccess,
        onFail: slice.actions.onRequestFailed,
        body: body,
        withAuthentication: withAuthentication,
    });
};

export const sendGetRequest = (
    apiUrl: string,
    path: string,
    withAuthentication: boolean,
    slice: Slice<BaseRequestSliceState>,
) => {
    return sendGet({
        apiUrl: apiUrl,
        path: path,
        onBefore: slice.actions.onRequestSent,
        onSuccess: slice.actions.onRequestSuccess,
        onFail: slice.actions.onRequestFailed,
        params: {
            q: "j%20k%20rowling",
        },
        withAuthentication: withAuthentication,
    });
};

export const sendFilePostRequest = (
    apiUrl: string,
    path: string,
    file: File,
    withAuthentication: boolean,
    onUploadProgress: (progressEvent: any) => void = (evt) => {},
    slice: Slice<BaseRequestSliceState>,
) => {
    return sendFilePost({
        apiUrl: apiUrl,
        path: path,
        onBefore: slice.actions.onRequestSent,
        onSuccess: slice.actions.onRequestSuccess,
        onFail: slice.actions.onRequestFailed,
        file: file,
        onUploadProgress: onUploadProgress,
        withAuthentication: withAuthentication,
    });
};
