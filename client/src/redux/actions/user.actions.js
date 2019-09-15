import {userService} from "../../services/userservice";
import {userConstants} from "../../constants/constants";
import {alertActions} from "./alert.actions";

import { push } from 'react-router-redux'

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return (dispatch) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) {
        console.log("Returning action type: LOGIN REQUEST");
        return { type: userConstants.LOGIN_REQUEST, user }
    }
    function success(user) {
        console.log("Login success");
        console.log(user); // <--- authentication token

        /**
         * Authentication token ideally should have expiration time on server side.
         *
         * 1. Get access token - short lived, we can store it in cookie or localStorage
         * 2. Get bearer token - long lived (for access token refresh request) - store it in secure cookie
         *
         * 3. Whenever access token is going to be expired, request new one
         *    using bearer token stored in cookie
         */

        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    function failure(data) {
        console.log("Response: ");
        console.log(data);
        return { type: userConstants.LOGIN_FAILURE, data }
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    // TODO: redirect to '/' or login page
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}