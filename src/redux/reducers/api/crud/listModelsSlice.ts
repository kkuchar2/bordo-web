import {createBaseRequestSlice, sendGetRequest} from "appRedux/reducers/generic_reducer";
import {API_URL, AppDispatch, RootState} from "appRedux/store";

export interface IFieldInfo {
    name: string,
    type: string
}

export const listModelsSlice = createBaseRequestSlice({name: 'listModels'});

export const tryGetListOfModels = () => sendGetRequest(API_URL, 'crud/listModels', true, {}, listModelsSlice);

export const tryResetModelListState = () => async (dispatch: AppDispatch) => dispatch(onReset());

export const selectorModelList = (state: RootState) => state.listModels;

export const {onReset} = listModelsSlice.actions;

export default listModelsSlice.reducer;