import {userConstants} from "../constants";

const initialState =  {
    registrationIdle : true,
    registering: false,
    registrationSubmitted: false,
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                registrationSubmitted: false,
                registrationIdle: false
            };
        case userConstants.ACCOUNT_CONFIRMATION_SUCCESS:
            return {
                registering: false,
                registrationSubmitted: false,
                registrationIdle: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registrationSubmitted: true,
                registrationIdle: false
            };
        case userConstants.REGISTER_IDLE:
            return {
                registering: false,
                registrationSubmitted: false,
                registrationIdle: true
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false,
                registrationSubmitted: false,
                registrationIdle: true
            };
        default:
            return state
    }
}