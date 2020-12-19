import {navbarConstants} from "../constants.js";
import {callbackOf} from "util/util.js";

export const setOpened = dispatch =>
    callbackOf(dispatch, dispatch => dispatch({type: navbarConstants.SET_OPENED}))

export const setClosed = dispatch =>
    callbackOf(dispatch, dispatch => dispatch({type: navbarConstants.SET_CLOSED}));