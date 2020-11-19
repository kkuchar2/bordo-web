import {navbarConstants} from "../constants.jsx";

let navbar = JSON.parse(localStorage.getItem('navbar'));

const initialState = navbar ? {
    opened: false, navbar
} : {};

export const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case navbarConstants.OPEN:
            return {
                opened: true,
                navbar: action.navbar
            };
        case navbarConstants.CLOSE:
            return {
                opened: false,
                navbar: action.navbar
            };
        default:
            return state
    }
}