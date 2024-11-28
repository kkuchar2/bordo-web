import { IconProps } from '@/components/Icons/Icon';

export interface IDialogComponentProps {
    title?: string;
    description?: string;
    icon?: IconProps;
    onCancel?: () => void;
    onBack?: () => void;
    onConfirm?: () => void;
    closeable?: boolean;
    arrowBack?: boolean;
}

export interface DialogProps<T = any> {
    dialog: IDialogComponentProps,
    data: T;
}

export interface DialogSliceState {
    opened: boolean,
    component: string,
    componentProps: DialogProps
}

export interface ShowDialogArgs<T = any> {
    // Describes key that will point to displayed component
    component: string,

    // What props are passed to this dialog component
    props: DialogProps<T>
}
