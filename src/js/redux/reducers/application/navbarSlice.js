import {createSlice} from "@reduxjs/toolkit"

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        opened: false,
    },
    reducers: {
        open: (state) => {
            state.opened = true;
        },
        close: (state) => {
            state.opened = false;
        }
    },
})

export const openNavbar = () => {
    return async dispatch => {
        dispatch(open())
    }
}

export const closeNavbar = () => {
    return async dispatch => {
        dispatch(close())
    }
}

export const selectorNavbar = state => state.opened
export const {open, close} = navbarSlice.actions
export default navbarSlice.reducer
