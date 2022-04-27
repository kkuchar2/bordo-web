import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "appRedux/store";

const modelViewSlice = createSlice({
    name: "modelView",
    initialState: {
        model: '',
        package: '',
        fullModelName: '',
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

export const changeCurrentViewedModel = (model: string, modelPackage: string) => async (dispatch: AppDispatch) => {
    return dispatch(changeCurrentModel({'package': modelPackage, 'model': model}));
};

export const selectorCurrentViewedModel = (state: RootState) => state.modelView;

export const {changeCurrentModel} = modelViewSlice.actions;
export default modelViewSlice.reducer;
