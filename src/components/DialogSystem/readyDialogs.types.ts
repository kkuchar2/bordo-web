export interface SentEmailDialogArgs<T> {
    component: string
    title: string,
    description: string,
    closeable?: boolean
    data: T
}