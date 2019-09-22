import {userService} from "../../services/userservice";
import {userConstants} from "../../constants/constants";

export const userActions = {
    login,
    register,
    closeRegistration,
    confirmAccount
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                response => dispatch({ type: userConstants.LOGIN_SUCCESS, response }),
                error => dispatch({ type: userConstants.LOGIN_FAILURE, error })
            );
    };
}

function register(email, username, password1, password2) {
    return dispatch => {
        userService.register(email, username, password1, password2)
            .then(
                response => dispatch({ type: userConstants.REGISTER_SUCCESS, response }),
                error => dispatch({ type: userConstants.REGISTER_FAILURE, error })
            );
    };
}

function closeRegistration() {
    return { type: userConstants.REGISTER_IDLE, undefined };
}

function confirmAccount(uid, token) {
    return dispatch => {
        userService.confirmAccount(uid, token)
            .then(
                response => dispatch({ type: userConstants.ACCOUNT_CONFIRMATION_SUCCESS, response }),
                error => dispatch({ type: userConstants.ACCOUNT_CONFIRMATION_FAILURE, error })
            );
    };
}