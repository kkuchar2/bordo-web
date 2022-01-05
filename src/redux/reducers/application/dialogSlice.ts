import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "appRedux/store";
import {BaseDialogProps} from "components/Dialogs/types";

export interface DialogSliceState {
    opened: boolean,
    component: string,
    componentProps: any
}

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: {
        opened: false,
        component: '',
        componentProps: null
    } as DialogSliceState,
    reducers: {
        _openDialog: (state, action) => {
            state.opened = true;
            state.component = action.payload.component;
            state.componentProps = action.payload.props;
        },
        _closeDialog: (state) => {
            state.opened = false;
            state.component = '';
        },
    },
});

export interface ShowDialogArgs<T extends BaseDialogProps> {
    // Describes key that will point to displayed component
    component: string,

    // What props are passed to this dialog component
    props: T
}

export const openDialog = <T extends BaseDialogProps>(args : ShowDialogArgs<T>) => {
    return async (dispatch: AppDispatch) => dispatch(_openDialog(args));
};

export const closeDialog = () => async (dispatch: AppDispatch) => {
    return dispatch(_closeDialog());
};

export const selectorDialogs = (state: RootState) => state.dialog;
export const {_openDialog, _closeDialog} = dialogSlice.actions;
export default dialogSlice.reducer;