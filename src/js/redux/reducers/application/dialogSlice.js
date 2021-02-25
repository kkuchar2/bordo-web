import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    opened: false,
    type: null,
    title: null,
    content: null,
    confirmed: false,
    onConfirm: null
}

const dialogSlice = createSlice({
    name: "dialogs",
    initialState: initialState,
    reducers: {
        show_dialog: (state, action) => {
            console.log(action)
            state.opened = true
            state.type = action.payload.type
            state.title = action.payload.title
            state.content = action.payload.content
            state.onConfirm = action.payload.onConfirm
            state.confirmed = false
        },
        hide_dialog: (state, action) => {
            state.opened = false
            state.type = null
            state.title = null
            state.content = null
            state.confirmed = false
        },
        confirm_dialog: (state, action) => {
            state.opened = false
            state.type = null
            state.title = null
            state.content = null
            state.confirmed = true
        }
    },
})

export const showConfirmationDialog = data => async dispatch => dispatch(show_dialog(data))
export const hideConfirmationDialog = () => async dispatch => dispatch(hide_dialog())
export const dialogConfirmed = data => async dispatch => dispatch(confirm_dialog());

export const selectorDialog = state => state.dialog
export const {show_dialog, hide_dialog, confirm_dialog} = dialogSlice.actions
export default dialogSlice.reducer