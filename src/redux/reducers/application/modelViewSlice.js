import {createSlice} from "@reduxjs/toolkit";

const modelViewSlice = createSlice({
    name: "modelView",
    initialState: {
        model: null,
        package: null,
        fullModelName: null,
    },
    reducers: {
        changeCurrentModel: (state, action) => {
            const data = action.payload;
            state.model = data.model;
            state.package = data.package;
            state.fullModelName = data.package + '.' + data.model;
        }
    },
});

export const changeCurrentViewedModel = (model, modelPackage) => async dispatch => {
    return dispatch(changeCurrentModel({ 'package' : modelPackage, 'model' : model }));
}

export const selectorCurrentViewedModel = state => state.modelView;

export const {changeCurrentModel} = modelViewSlice.actions;
export default modelViewSlice.reducer;
