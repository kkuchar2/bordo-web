import {ResponseArgs} from 'tools/client/client.types';

export interface BackendTableColumn {
    name: string,
    type: string,
    isEditable: boolean
}

export interface ModelDeleteResponse {
    package: string;
    modelName: string;
    rowId: number;
}

export interface AddItemToTableArgs {
    modelPackage: string,
    model: string,
    itemData: any
}

export interface BackendTableData {
    model: string,
    package: string,
    headers: BackendTableColumn[],
    rows: object
}

// How response action payload should look like:
export interface ModelDataResponse {
    path: string,
    errors: string[]
    data: BackendTableData
}

// How we store models data
export interface BackendTablesData {
    [modelID: string]: BackendTableData
}

export interface BackendModelInfo {
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
    modelTypes: BackendModelInfo[],
    modelsData: BackendTablesData
}
