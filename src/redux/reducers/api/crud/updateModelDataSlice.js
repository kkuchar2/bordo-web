import {createSlice} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util.js";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    responseData: null,
    pendingRow: null,
    errors: []
};

const setState = (state, action, requestSent, responseReceived, pendingRow = null) => {
    const {errors = [], path = 'default'} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
    state.responseData = action.payload.data;
    state.pendingRow = pendingRow ? pendingRow : null;
};

export const updateModelDataSlice = createSlice({
    name: 'updateModelData',
    initialState: initialState,
    reducers: {
        sentUpdateModelDataRequest: (state, action) => setState(state, action, true, false, action.payload.body.data.id),
        updateModelDataSuccess: (state, action) => setState(state, action, false, true),
        updateModelDataFailed: (state, action) => setState(state, action, false, true),
        updateModelDataResetState: (state, action) => setState(state, action, false, false)
    }
});

export const tryUpdateModelData = (modelPackage, model, data) => {
    console.log('Updating model data: ' + modelPackage);
    console.log(data);
    return sendPost({
        endpointName: 'updateModel',
        onBefore: sentUpdateModelDataRequest,
        onSuccess: updateModelDataSuccess,
        onFail: updateModelDataFailed,
        body: {
            'package': modelPackage,
            'model': model,
            'data': data
        }
    });
};

export const tryResetUpdateModelDataState = () => async dispatch => dispatch(updateModelDataResetState());

export const selectorUpdateModelData = state => state.updateModelData;

export const {
    sentUpdateModelDataRequest,
    updateModelDataSuccess,
    updateModelDataFailed,
    updateModelDataResetState
} = updateModelDataSlice.actions;
export default updateModelDataSlice.reducer;