import {userConstants} from "../../constants/constants";

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                registrationComplete: false
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registrationComplete: true
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false,
                registrationComplete: false
            };
        default:
            return state
    }
}