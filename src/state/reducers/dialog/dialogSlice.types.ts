import { IconProps } from '@/components/Icons/Icon';

export type DialogComponentProps = {
    title?: string;
    description?: string;
    icon?: IconProps;
    maxWidth?: number;
    onCancel?: () => void;
    onBack?: () => void;
    onConfirm?: () => void;
    closeable?: boolean;
    arrowBack?: boolean;
}

export type DialogProps<T = any> = {
    dialog: DialogComponentProps;
    data: T;
}

export type DialogSliceState = {
    opened: boolean,
    component: string,
    componentProps: DialogProps
}

export type ShowDialogArgs<T = any> = {
    // Describes key that will point to displayed component
    component: string,

    // What props are passed to this dialog component
    props: DialogProps<T>
}
