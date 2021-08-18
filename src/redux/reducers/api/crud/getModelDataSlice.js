import {createSlice} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util.js";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    modelsData: {},
    errors: []
};

const setState = (state, action, requestSent, responseReceived) => {
    const {errors = [], path = 'default'} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;

    const data = action.payload.data;

    if (!data) {
        return;
    }

    const key = data.package + '.' + data.model;
    const currentModelData = state.modelsData[key];
    const newRows = currentModelData ? currentModelData.rows : {};

    for (let i = 0; i < data['rows'].length; i++) {
        const row = data['rows'][i];
        const pk = row['id'];
        newRows[pk] = row;
    }


    state.modelsData[data.package + '.' + data.model] = {
        headers: data['headers'],
        rows: newRows
    }

    // new rows might contain duplicates if we are sending updated row
    // remove all rows but one if row.id is the same

    // TODO: Instead of storing rows as array - store it as
    // TODO: dict - it will be easier to update row!!!
    // TODO: also send update with only 'dirty' fields, not all of them!
};

export const getModelDataSlice = createSlice({
    name: 'getModelData',
    initialState: initialState,
    reducers: {
        sentGetModelDataRequest: (state, action) => setState(state, action, true, false),
        getModelDataSuccess: (state, action) => setState(state, action, false, true),
        getModelDataFailed: (state, action) => setState(state, action, false, true),
        getModelDataResetState: (state, action) => setState(state, action, false, false)
    }
});

export const getRangeModelData = (modelPackage, model, startIdx, endIdx) => {
    return sendPost({
        endpointName: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        body: { package: modelPackage, model: model, startIdx: startIdx, endIdx: endIdx }
    });
};

export const getSingleRowModelData = (modelPackage, model, idx) => {
    return sendPost({
        endpointName: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        body: { package: modelPackage, model: model, idx: idx }
    });
};

export const getAllModelData = (modelPackage, model) => {
    return sendPost({
        endpointName: 'getModel',
        onBefore: sentGetModelDataRequest,
        onSuccess: getModelDataSuccess,
        onFail: getModelDataFailed,
        body: { package: modelPackage, model: model }
    });
};


export const tryResetModelDataState = () => async dispatch => dispatch(getModelDataResetState());

export const selectorModelData = state => state.getModelData;

export const {
    sentGetModelDataRequest,
    getModelDataSuccess,
    getModelDataFailed,
    getModelDataResetState
} = getModelDataSlice.actions;
export default getModelDataSlice.reducer;