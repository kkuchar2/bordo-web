import {connectionConstants} from "redux/constants.jsx";

const initialState = {connected: false}

export const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case connectionConstants.CONNECTED:
            return {
                connected: true,
            };
        case connectionConstants.DISCONNECTED:
            return {
                connected: false,
            };
        default:
            return state
    }
}