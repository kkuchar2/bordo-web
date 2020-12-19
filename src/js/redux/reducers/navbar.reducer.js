import {navbarConstants} from "redux/constants.js";

const initialState = {opened: false}

export const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case navbarConstants.SET_OPENED:
            return {
                opened: true
            };
        case navbarConstants.SET_CLOSED:
            return {
                opened: false,
            }
        default:
            return state
    }
}