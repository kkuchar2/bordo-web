import {userConstants} from "../../constants/constants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {
    loggedIn: true, user
} : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loginError: false,
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loginError: false,
                loggingIn: false,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loginError: true,
                loggingIn: false,
                loggedIn: false,
                user: undefined
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}