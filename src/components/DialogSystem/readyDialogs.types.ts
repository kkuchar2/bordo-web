export interface ReadyDialogArgs {
    data?: object
}

export interface SentEmailDialogArgs extends ReadyDialogArgs {
    component: string
    title: string,
    description: string,
    closeable?: boolean
}