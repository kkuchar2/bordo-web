import {IconProps} from "icon/icon.types";
import {TFunction} from "react-i18next";
import {AppDispatch} from "state/store";

export interface IDialogComponentProps {
    title?: string;
    description?: string;
    icon?: IconProps;
    onCancel?: () => void;
    onConfirm?: () => void;
    width?: number;
    closeable?: boolean;
}

export interface BaseDialogProps {
    dispatch?: AppDispatch,
    t?: TFunction,
}

export interface DialogProps<T = any> {
    dialog: IDialogComponentProps,
    data: T | null;
}

export interface DialogSliceState {
    opened: boolean,
    component: string,
    componentProps: DialogProps & BaseDialogProps
}

export interface ShowDialogArgs<T = any> {
    // Describes key that will point to displayed component
    component: string,

    // What props are passed to this dialog component
    props: DialogProps<T>
}