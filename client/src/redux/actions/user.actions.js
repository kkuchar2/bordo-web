import {userService} from "../../services/userservice";
import {userConstants} from "../../constants/constants";
import {alertActions} from "./alert.actions";

export const userActions = {
    login,
    register,
    confirmAccount
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                response => {
                    dispatch({ type: userConstants.LOGIN_SUCCESS, response });
                    dispatch(alertActions.success('Login successful'));
                },
                error => {
                    dispatch({ type: userConstants.LOGIN_FAILURE, error });
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function register(email, username, password1, password2) {
    return dispatch => {
        userService.register(email, username, password1, password2)
            .then(
                response => {
                    dispatch({ type: userConstants.REGISTER_SUCCESS, response });
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch({ type: userConstants.REGISTER_FAILURE, error });
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function confirmAccount(uid, token) {
    return dispatch => {
        userService.confirmAccount(uid, token)
            .then(
                response => {
                    dispatch({ type: userConstants.ACCOUNT_CONFIRMATION_SUCCESS, response });
                    dispatch(alertActions.success('Account confirmation successful'));
                },
                error => {
                    dispatch({ type: userConstants.ACCOUNT_CONFIRMATION_FAILURE, error });
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}