import {createSlice} from "@reduxjs/toolkit";
import {DialogSliceState, ShowDialogArgs} from "appRedux/reducers/application/dialogSlice.types";
import {AppDispatch, RootState} from "appRedux/store";

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: {
        opened: false,
        component: '',
        componentProps: null
    } as DialogSliceState,
    reducers: {
        onOpenDialog: (state, action) => {
            const payload = action.payload;
            state.opened = true;
            state.component = payload.component;
            state.componentProps = action.payload.props;
        },
        onCloseDialog: (state) => {
            state.opened = false;
            state.component = '';
            state.componentProps = null;
        },
        onDialogTitleChange: (state, action) => {
            state.componentProps = {
                ...state.componentProps,
                dialog: {
                    ...state.componentProps.dialog,
                    title: action.payload
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

export const selectorDialogs = (state: RootState) => state.dialog;
export const {onOpenDialog, onCloseDialog, onDialogTitleChange} = dialogSlice.actions;
export default dialogSlice.reducer;