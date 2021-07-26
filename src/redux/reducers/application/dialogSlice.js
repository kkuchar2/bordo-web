import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    opened: false,
    title: null,
    description: null,
    onConfirm: () => {},
    onCancel: () => {},
};

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: initialState,
    reducers: {
        show_dialog: (state, action) => {
            const {title, description, onConfirm, onCancel } = action.payload;
            state.opened = true;
            state.title = title;
            state.description = description;
            state.onConfirm = () => onConfirm?.();
            state.onCancel = () => onCancel?.();
        },
        hide_dialog: (state, action) => {
            state.opened = false;
            state.title = null;
            state.description = null;
            state.confirmed = false;
            state.onConfirm = null;
            state.onCancel = null;
        },
        confirm_dialog: (state, action) => {
            state.opened = false;
            state.title = null;
            state.description = null;
            state.onConfirm = null;
            state.onCancel = null;
        }
    },
});

export const showDialog = data => async dispatch => {
    const onConfirm = data.onConfirm;
    const onCancel = data.onCancel;

    data.onConfirm = () => {
        onConfirm?.();
        dispatch(hideDialog());
    };

    data.onCancel = () => {
        onCancel?.();
        dispatch(hideDialog());
    };

    return dispatch(show_dialog(data));
};
export const hideDialog = () => async dispatch => dispatch(hide_dialog());
export const dialogConfirmed = data => async dispatch => dispatch(confirm_dialog());

export const selectorDialogs = state => state.dialog;
export const {show_dialog, hide_dialog, confirm_dialog} = dialogSlice.actions;
export default dialogSlice.reducer;