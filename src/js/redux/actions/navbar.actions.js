import {navbarConstants} from "../constants.jsx";

const press = dispatch => dispatch({ type: navbarConstants.PRESS });
const close = dispatch => dispatch({ type: navbarConstants.CLOSE });

export const navbarActions = { press, close };