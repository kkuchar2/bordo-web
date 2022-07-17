export interface IModel {
    model: string,
    package: string,
    fullModelName: string,
}

export interface AppSliceState {
    currentView: string;
    theme: string;
    currentModel: IModel | null
}
