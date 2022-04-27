export interface DialogProps<T = any> {
    dialog: {
        title: string,
        description?: string,
        onConfirm?: (e: Event) => void,
        onCancel?: (e: Event) => void
    },
    data: T | null
}
