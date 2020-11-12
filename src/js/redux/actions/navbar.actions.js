import {navbarConstants} from "../constants.jsx";

function open() {
    return dispatch => dispatch({ type: navbarConstants.OPEN });
}

function close() {
    return dispatch => dispatch({ type: navbarConstants.CLOSE });
}

export const navbarActions = {
    open,
    close,
};