import {ResponseArgs} from "tools/client/client.types";

export interface ColumnHeader {
    name: string,
    type: string,
    isEditable: boolean
}

export interface ModelDeleteResponse {
    package: string;
    modelName: string;
    rowId: number;
}

export interface Rows {
    [rowId: number]: object
}

export interface AddItemToTableArgs {
    modelPackage: string,
    model: string,
    itemData: any
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

export interface ModelType {
    package: string,
    model: string
}

export interface IModelSliceState {
    requests: {
        getModelTypes: ResponseArgs,
        getModelData: ResponseArgs,
        updateModelData: ResponseArgs,
        deleteRow: ResponseArgs,
        addRow: ResponseArgs,
    },
    modelTypes: ModelType[],
    modelsData: IAllModelsData
}
