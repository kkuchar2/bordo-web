import {navbarConstants} from "redux/constants.jsx";

const initialState =  { opened: false }

export const navbarReducer = (state = initialState, action)  => {
    switch (action.type) {
        case navbarConstants.PRESS:
            return {
                opened: !state.opened,
            };
        case navbarConstants.CLOSE:
            return {
                opened: false,
            }
        default:
            return state
    }
}