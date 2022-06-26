import {createSlice} from "@reduxjs/toolkit";
import {NavbarSliceState} from "appRedux/reducers/application/navbarSlice.types";
import {AppDispatch, RootState} from "appRedux/store";

const defaultState: NavbarSliceState = {
    opened: false,
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState: defaultState,
    reducers: {
        onOpenNavbar: (state,) => {
            state.opened = true;
        },
        onCloseNavbar: () => defaultState,
    },
});

export const openNavbar = () => async (dispatch: AppDispatch) => dispatch(onOpenNavbar());

export const closeNavbar = () => async (dispatch: AppDispatch) => dispatch(onCloseNavbar());

export const selectorNavbar = (state: RootState) => state.navbar;

export const { onOpenNavbar, onCloseNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;