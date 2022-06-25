import {createSlice} from "@reduxjs/toolkit";
import {DialogSliceState, ShowDialogArgs} from "appRedux/reducers/application/dialogSlice.types";
import {AppDispatch, RootState} from "appRedux/store";

const defaultDialogState : DialogSliceState = {
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
            state.componentProps.dialog = {...state.componentProps.dialog, ...action.payload.props.dialog};
            state.componentProps.data = {...state.componentProps.data, ...action.payload.props.data};
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

export const openDialog = <T = any>(args : ShowDialogArgs<T>) => {
    return async (dispatch: AppDispatch) => dispatch(onOpenDialog(args));
};

export const closeDialog = () => {
    return async (dispatch: AppDispatch) => dispatch(onCloseDialog());
};

export const changeDialogTitle = (newTitle: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(onDialogTitleChange(newTitle));
    };
};

export const setCloseable = (closeable: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch(onDialogCloseableChange(closeable));
    };
};

export const selectorDialogs = (state: RootState) => state.dialog;
export const {onOpenDialog, onCloseDialog, onDialogTitleChange, onDialogCloseableChange} = dialogSlice.actions;
export default dialogSlice.reducer;