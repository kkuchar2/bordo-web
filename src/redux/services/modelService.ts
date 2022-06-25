import {AddItemToTableArgs} from "appRedux/reducers/api/crud/modelSlice.types";
import {AxiosConfigs} from "appRedux/services/config";
import {ApiClient} from "appRedux/store";
import {RequestType} from "tools/client/client.types";
import {request} from "tools/requests";

import {actions} from "./../reducers/api/crud/modelSlice";

const LIST_MODELS_URL = 'crud/list-models';
const GET_MODEL_URL = 'crud/get-model';
const UPDATE_MODEL_URL = 'crud/update-model';
const REMOVE_MODEL_DATA_URL = 'crud/remove-model-data';
const ADD_ITEM_TO_TABLE_URL = 'crud/add-item';

export const listModels = () => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.GET,
        url: LIST_MODELS_URL,
        action: actions.getModelTypes,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
        requestData: {},
    });
};

export const getRangeModelData = (modelPackage: string, model: string, startIdx: number, endIdx: number) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: GET_MODEL_URL,
        action: actions.getModelData,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
        requestData: { package: modelPackage, model: model, startIdx: startIdx, endIdx: endIdx },
    });
};

export const getSingleRowModelData = (modelPackage: string, model: string, idx: number) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: GET_MODEL_URL,
        action: actions.getModelData,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
        requestData: { package: modelPackage, model: model, idx: idx },
    });
};

export const getMultiRowModelData = (modelPackage: string, model: string, indices: Array<number>) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: GET_MODEL_URL,
        action: actions.getModelData,
        requestData: { package: modelPackage, model: model, indices: indices },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
    });
};

export const getAllModelData = (modelPackage: string, model: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: GET_MODEL_URL,
        action: actions.getModelData,
        requestData: { package: modelPackage, model: model },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
    });
};

export const updateRow = (modelPackage: string, model: string, data: object) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: UPDATE_MODEL_URL,
        action: actions.updateRow,
        requestData: {
            package: modelPackage,
            model: model,
            data: data
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
    });
};

export const addRow = (args: AddItemToTableArgs) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        action: actions.addRow,
        url: ADD_ITEM_TO_TABLE_URL,
        requestData: args,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
    });
};

export const deleteRow = (modelPackage: string, model: string, rowId: number) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: REMOVE_MODEL_DATA_URL,
        action: actions.deleteRow,
        requestData: {
            package: modelPackage,
            model: model,
            rows: [rowId]
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
    });
};
