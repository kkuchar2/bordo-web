import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DefaultResponseArgs, RequestStatus, ResponseArgs} from "tools/client/client.types";

import {IModelSliceState, ModelDeleteResponse, ModelType} from "./modelSlice.types";

export const modelSlice = createSlice({
    name: 'getModelData',
    initialState: {
        requests: {
            getModelTypes: DefaultResponseArgs(),
            getModelData: DefaultResponseArgs(),
            updateModelData: DefaultResponseArgs(),
            deleteRow: DefaultResponseArgs(),
            addRow: DefaultResponseArgs(),
        },
        modelTypes: <ModelType[]>[],
        modelsData: {}
    } as IModelSliceState,
    reducers: {
        getModelTypes: (state: IModelSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.getModelTypes.info = action.payload.info;
            const types = action.payload.responseData;
            state.modelTypes = types ? types : [];
        },
        getModelData: (state: IModelSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.getModelData.info = action.payload.info;

            const status = action.payload.info.status;
            const data = action.payload.responseData;

            if (status === RequestStatus.Success) {
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
            }
        },
        addRow: (state: IModelSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.addRow = action.payload;
        },
        updateRow: (state: IModelSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.updateModelData = action.payload;
        },
        deleteRow: (state: IModelSliceState, action: PayloadAction<ResponseArgs<ModelDeleteResponse>>) => {
            state.requests.deleteRow = action.payload;

            const status = action.payload.info.status;
            const data = action.payload.responseData;

            if (status === RequestStatus.Success) {
                delete state.modelsData[`${data.package}.${data.modelName}`].rows[data.rowId];
            }
        },
    }
});

export const { actions } = modelSlice;

export default modelSlice.reducer;