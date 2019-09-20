import {userConstants} from "../../constants/constants";

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                registrationComplete: false,
                email_confirmed: false
            };
        case userConstants.ACCOUNT_CONFIRMATION_SUCCESS:
            return {
                registering: false,
                registrationComplete: false,
                email_confirmed: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registrationComplete: true,
                email_confirmed: false
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false,
                registrationComplete: false,
                email_confirmed: false
            };
        default:
            return state
    }
}