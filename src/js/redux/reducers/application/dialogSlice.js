import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    opened: false,
    type: null,
    title: null,
    cancelButtonClass: 'buttonBlack',
    confirmButtonClass: 'buttonRed',
    cancelButtonName: 'Cancel',
    confirmButtonName: 'Confirm',
    content: null,
    confirmed: false,
    onConfirm: () => {},
    onCancel: () => {},
};

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: initialState,
    reducers: {
        show_dialog: (state, action) => {
            const payload = action.payload;
            state.opened = true;
            state.type = payload.type;
            state.title = payload.title;
            state.content = payload.content;
            state.onConfirm = payload.onConfirm !== undefined ? payload.onConfirm : () => {};
            state.onCancel = payload.onCancel !== undefined ? payload.onCancel : () => {};
            state.confirmed = false;
            state.cancelButtonClass = payload.cancelButtonClass;
            state.confirmButtonClass = payload.confirmButtonClass;
            state.cancelButtonName = payload.cancelButtonName;
            state.confirmButtonName = payload.confirmButtonName;
        },
        hide_dialog: (state, action) => {
            state.opened = false;
            state.type = null;
            state.title = null;
            state.content = null;
            state.confirmed = false;
        },
        confirm_dialog: (state, action) => {
            state.opened = false;
            state.type = null;
            state.title = null;
            state.content = null;
            state.confirmed = true;
        }
    },
});

export const showDialog = data => async dispatch => dispatch(show_dialog(data));
export const hideDialog = () => async dispatch => dispatch(hide_dialog());
export const dialogConfirmed = data => async dispatch => dispatch(confirm_dialog());

export const selectorDialog = state => state.dialog;
export const {show_dialog, hide_dialog, confirm_dialog} = dialogSlice.actions;
export default dialogSlice.reducer;