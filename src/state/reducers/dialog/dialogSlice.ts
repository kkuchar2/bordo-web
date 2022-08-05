import {createSlice, Dispatch} from "@reduxjs/toolkit";

import {DialogSliceState, ShowDialogArgs} from "./dialogSlice.types";

const defaultDialogState: DialogSliceState = {
    opened: false,
    component: '',
    componentProps: {
        dialog: {
            title: 'Default dialog',
            description: null,
            closeable: true
        },
        data: null
    }
};

const dialogSlice = createSlice({
    name: "dialogs",
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
        onDialogTitleChange: (state, action) => {
            state.componentProps = {
                ...state.componentProps,
                dialog: {
                    ...state.componentProps.dialog,
                    title: action.payload
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

export const changeDialogTitle = (newTitle: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(onDialogTitleChange(newTitle));
    };
};

export const setCloseable = (closeable: boolean) => {
    return async (dispatch: Dispatch) => {
        dispatch(onDialogCloseableChange(closeable));
    };
};

export const { onOpenDialog, onCloseDialog, onDialogTitleChange, onDialogCloseableChange } = dialogSlice.actions;
export default dialogSlice.reducer;