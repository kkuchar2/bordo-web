import {createBaseRequestSlice, sendPostRequest} from "appRedux/reducers/generic_reducer";
import {API_URL, RootState} from "appRedux/store";

export const addItemToTableSlice = createBaseRequestSlice({name: 'addItemToTable'});

interface AddItemToTableArgs {
    modelPackage: string,
    model: string,
    itemData: any
}

export const tryAddItemToTable = (args: AddItemToTableArgs) => {
    const {modelPackage, model, itemData} = args;

    const body = {
        'package': modelPackage,
        'model': model,
        'data': itemData
    };

    return sendPostRequest(API_URL, 'addItem', body, true, addItemToTableSlice);
};

export const selectorAddItemToTable = (state: RootState) => state.addItemToTable;

export default addItemToTableSlice.reducer;