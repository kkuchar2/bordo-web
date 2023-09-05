import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { DialogSliceState, DialogComponentProps, ShowDialogArgs } from './dialogSlice.types';

const defaultDialogState: DialogSliceState = {
    opened: false,
    component: '',
    componentProps: {
        dialog: {},
        data: null,
    }
};

const dialogSlice = createSlice({
    name: 'dialogs',
    initialState: defaultDialogState,
    reducers: {
        onOpenDialog: (state, action) => {
            const payload = action.payload;
            state.opened = true;
            state.component = payload.component;
            state.componentProps.dialog = { ...state.componentProps.dialog, ...action.payload.props.dialog };
            state.componentProps.data = { ...state.componentProps.data, ...action.payload.props.data };
        },
        onCloseDialog: () => defaultDialogState,
        onDialogPropsChange: (state, action: PayloadAction<DialogComponentProps>) => {
            state.componentProps = {
                ...state.componentProps,
                dialog: {
                    ...state.componentProps.dialog,
                    ...action.payload
                }
            };
        },
        onDialogCloseableChange: (state, action) => {
            state.componentProps = {
                ...state.componentProps,
                dialog: {
                    ...state.componentProps.dialog,
                    closeable: action.payload
                }
            };
        }
    },
});

export const openDialog = <T = any>(args: ShowDialogArgs<T>) => {
    return async (dispatch: Dispatch) => dispatch(onOpenDialog(args));
};

export const closeDialog = () => {
    return async (dispatch: Dispatch) => dispatch(onCloseDialog());
};

export const changeDialog = (newTitle: string, newWidth: number, arrowBack?: boolean, onBack?: () => void) => {
    return async (dispatch: Dispatch) => {
        dispatch(onDialogPropsChange({
            title: newTitle,
            arrowBack: arrowBack,
            onBack: onBack
        }));
    };
};

export const { onOpenDialog, onCloseDialog, onDialogPropsChange, onDialogCloseableChange } = dialogSlice.actions;
export default dialogSlice.reducer;
