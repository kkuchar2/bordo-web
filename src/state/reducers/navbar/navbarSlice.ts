import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { NavbarSliceState } from '@/state/reducers/navbar/navbarSlice.types';

const defaultState: NavbarSliceState = {
    opened: false,
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: defaultState,
    reducers: {
        onOpenNavbar: (state,) => {
            state.opened = true;
        },
        onCloseNavbar: () => defaultState,
    },
});

export const openNavbar = () => async (dispatch: Dispatch) => dispatch(onOpenNavbar());

export const closeNavbar = () => async (dispatch: Dispatch) => dispatch(onCloseNavbar());

export const { onOpenNavbar, onCloseNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;