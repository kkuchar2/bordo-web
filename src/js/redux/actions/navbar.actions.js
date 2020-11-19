import {navbarConstants} from "../constants.jsx";

const open = () => dispatch => dispatch({ type: navbarConstants.OPEN });

const close = () => dispatch => dispatch({ type: navbarConstants.CLOSE });

export const navbarActions = { open, close };