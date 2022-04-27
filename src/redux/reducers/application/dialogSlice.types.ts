import {DialogProps} from "components/Dialogs/types";

export interface IDialogComponentProps {
    title: string;
    description: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export interface IComponentProps {
    dialog: IDialogComponentProps
    data: any;
}

export interface DialogSliceState {
    opened: boolean,
    component: string,
    componentProps: IComponentProps
}

export interface ShowDialogArgs<T = any> {
    // Describes key that will point to displayed component
    component: string,

    // What props are passed to this dialog component
    props: DialogProps<T>
}