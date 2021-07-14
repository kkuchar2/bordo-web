import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    opened: false
};

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState: initialState,
    reducers: {
        onNavbarOpened: (state) => {
            state.opened = true;
        },
        onNavbarClosed: (state) =>  {
            state.opened = false;
        },
    }
});

export const openNavbar = () => async dispatch => dispatch(onNavbarOpened());
export const closeNavbar = () => async dispatch => dispatch(onNavbarClosed());

export const selectorNavbar = state => state.opened;

export const { onNavbarOpened, onNavbarClosed } = navbarSlice.actions;
export default navbarSlice.reducer;