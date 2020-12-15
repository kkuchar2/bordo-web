import {connectionConstants} from "../constants.jsx";

const connected = () => dispatch => dispatch({type: connectionConstants.CONNECTED});
const disconnected = () => dispatch => dispatch({type: connectionConstants.DISCONNECTED});

export const connectionActions = {connected, disconnected};