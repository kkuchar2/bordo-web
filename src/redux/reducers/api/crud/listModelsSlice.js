import {createSlice} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util.js";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    modelList: [],
    errors: []
};

const setState = (state, action, requestSent, responseReceived) => {
    const {errors = [], path = 'default'} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
    state.modelList = action.payload.data;
};

export const listModelsSlice = createSlice({
    name: 'listModels',
    initialState: initialState,
    reducers: {
        sentListModelsequest: (state, action) => setState(state, action, true, false),
        listModelsSuccess: (state, action) => setState(state, action, false, true),
        listModelsFailed: (state, action) => setState(state, action, false, true),
        listModelsResetState: (state, action) => setState(state, action, false, false)
    }
});

export const tryGetListOfModels = () => {
    return sendPost({
        endpointName: 'listModels',
        onBefore: sentListModelsequest,
        onSuccess: listModelsSuccess,
        onFail: listModelsFailed,
        body: {}
    });
};

export const tryResetModelListState = () => async dispatch => dispatch(listModelsResetState());

export const selectorModelList = state => state.listModels;

export const {
    sentListModelsequest,
    listModelsSuccess,
    listModelsFailed,
    listModelsResetState
} = listModelsSlice.actions;
export default listModelsSlice.reducer;