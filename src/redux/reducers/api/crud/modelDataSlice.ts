import {createSlice} from "@reduxjs/toolkit";
import {API_URL, AppDispatch, RootState} from "appRedux/store";
import {customResponseParser, sendPost, RequestState, RequestStatus} from "axios-client-wrapper";

// Response for single model
export interface ColumnHeader {
    name: string,
    type: string,
    isEditable: boolean
}

export interface Rows {
    [rowId: number]: object
}

export interface ModelData {
    model: string,
    package: string,
    headers: ColumnHeader[],
    rows: Rows
}

// How response action payload should look like:
export interface ModelDataResponse {
    path: string,
    errors: string[]
    data: ModelData
}

// How we store models data
export interface IAllModelsData {
    [modelIdentifier: string]: ModelData
}

export interface ModelInfo {
    modelPackage: string,
    modelName: string
}

export interface IGetModelsDataSliceState {
    path: string,
    requestState: RequestState
    modelsList: ModelInfo[],
    modelsData: IAllModelsData,
    updateInfo: any,
    deleteInfo: any,
    errors: string[]
}

export const getModelDataSlice = createSlice({
    name: 'getModelData',
    initialState: {
        path: '',
        requestState: {pending: false, status: RequestStatus.Unknown},
        modelsData: {},
        modelsList: [],
        updateInfo: null,
        deleteInfo: null,
        errors: [],
    } as IGetModelsDataSliceState,
    reducers: {
        sentGetModelDataRequest: (state, action) => {
            const {errors = [], path = ''} = action.payload ? action.payload : {};
            state.errors = errors;
            state.path = path;
            state.requestState = {pending: true, status: RequestStatus.Waiting};
        },
        getModelDataSuccess: (state, action) => {
            const {errors = [], path = '', data = {}} = action.payload ? action.payload : {};

            state.errors = errors;
            state.path = path;
            state.requestState = {pending: false, status: RequestStatus.Success};

            if (Object.keys(data).length === 0) {
                return;
            }

            const key = data.package + '.' + data.model;
            const currentModelData = state.modelsData[key];
            const newRows = currentModelData ? currentModelData.rows : {};

            for (let i = 0; i < data.rows.length; i++) {
                const row = data.rows[i];
                const pk = row.id;
                newRows[pk] = row;
            }

            state.modelsData[key] = {
                model: data.model,
                package: data.package,
                headers: data['headers'],
                rows: newRows
            };

            // new rows might contain duplicates if we are sending updated row
            // remove all rows but one if row.id is the same

            // TODO: Instead of storing rows as array - store it as
            // TODO: dict - it will be easier to update row!!!
            // TODO: also send update with only 'dirty' fields, not all of them!
        },
        getModelDataFailed: (state, action) => {
            const {errors = [], path = ''} = action.payload ? action.payload : {};

            state.errors = errors;
            state.path = path;
            state.requestState = {pending: false, status: RequestStatus.Failure};
        },
        sentUpdateModelDataRequest: (state, action) => {
            const {errors = [], path = ''} = action.payload ? action.payload : {};
            state.path = path;
            state.errors = errors;
            state.requestState = {pending: true, status: RequestStatus.Unknown};
        },
        updateModelDataSuccess: (state, action) => {
            const {errors = [], path = '', data = {}} = action.payload ? action.payload : {};
            state.updateInfo = data;
            state.path = path;
            state.errors = errors;
            state.requestState = {pending: false, status: RequestStatus.Success};
        },
        updateModelDataFailed: (state, action) => {
            const {errors = [], path = ''} = action.payload ? action.payload : {};
            state.path = path;
            state.errors = errors;
            state.requestState = {pending: false, status: RequestStatus.Failure};
        },
        sentDeleteModelRowRequest: (state, action) => {
            const {errors = [], path = ''} = action.payload ? action.payload : {};
            state.path = path;
            state.errors = errors;
            state.requestState = {pending: true, status: RequestStatus.Unknown};
        },
        modelRowDeleteSuccess: (state, action) => {
            const {errors = [], path = '', data = {}} = action.payload ? action.payload : {};
            data.removedIds.forEach((id : number) => delete state.modelsData[data.package + '.' + data.model].rows[id]);
            state.deleteInfo = data;
            state.path = path;
            state.errors = errors;
            state.requestState = {pending: false, status: RequestStatus.Success};
        },
        modelRowDeleteFailed: (state, action) => {
            const {errors = [], path = ''} = action.payload ? action.payload : {};
            state.path = path;
            state.errors = errors;
            state.requestState = {pending: false, status: RequestStatus.Failure};
        },
        getModelDataResetState: (state) => {
            state.errors = [];
            state.path = '';
            state.requestState = {pending: false, status: RequestStatus.Unknown};
            state.modelsList = [];
            state.modelsData = {};
        }
    }
});

export const getRangeModelData = (modelPackage: string, model: string, startIdx: number, endIdx: number) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model, startIdx: startIdx, endIdx: endIdx}
    });
};

export const getSingleRowModelData = (modelPackage: string, model: string, idx: number) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model, idx: idx}
    });
};

export const getMultiRowModelData = (modelPackage: string, model: string, indices: Array<number>) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model, indices: indices}
    });
};

export const getAllModelData = (modelPackage: string, model: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {package: modelPackage, model: model}
    });
};

export const tryUpdateModelData = (modelPackage: string, model: string, data: object) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'updateModel',
        onBefore: sentUpdateModelDataRequest,
        onSuccess: updateModelDataSuccess,
        onFail: updateModelDataFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {
            package: modelPackage,
            model: model,
            data: data
        }
    });
};

export const tryDeleteModelRow = (modelPackage: string, model: string, rowId: number) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'removeModelData',
        onBefore: sentDeleteModelRowRequest,
        onSuccess: modelRowDeleteSuccess,
        onFail: modelRowDeleteFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {
            package: modelPackage,
            model: model,
            rows: [rowId]
        }
    });
};

export const tryResetModelDataState = () => (dispatch: AppDispatch) => dispatch(getModelDataResetState());

export const selectorModelData = (state: RootState) => state.modelData;

export const selectorModelUpdate = (state: RootState) => state.modelData;

export const {
    sentGetModelDataRequest,
    getModelDataSuccess,
    getModelDataFailed,
    sentUpdateModelDataRequest,
    updateModelDataSuccess,
    updateModelDataFailed,
    getModelDataResetState,
    sentDeleteModelRowRequest,
    modelRowDeleteSuccess,
    modelRowDeleteFailed
} = getModelDataSlice.actions;
export default getModelDataSlice.reducer;