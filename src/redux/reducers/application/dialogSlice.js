import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    opened: false,
    component: null,
    componentProps: {}
};

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: initialState,
    reducers: {
        show_dialog: (state, action) => {
            console.log('action payload')
            console.log(action.payload)
            state.opened = true;
            state.component = action.payload.component;
            state.componentProps = action.payload.props;
        },
        hide_dialog: (state, action) => {
            state.opened = false;
            state.component = null;
        },
    },
});

export const showDialog = component => async dispatch => dispatch(show_dialog(component));
export const hideDialog = () => async dispatch => dispatch(hide_dialog());

export const selectorDialogs = state => state.dialog;
export const {show_dialog, hide_dialog} = dialogSlice.actions;
export default dialogSlice.reducer;