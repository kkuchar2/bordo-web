import {navbarConstants} from "../constants.jsx";
import {callbackOf} from "util/Util.jsx";

export const setOpened = dispatch =>
    callbackOf(dispatch, dispatch => dispatch({type: navbarConstants.SET_OPENED}))

export const setClosed = dispatch =>
    callbackOf(dispatch, dispatch => dispatch({type: navbarConstants.SET_CLOSED}));