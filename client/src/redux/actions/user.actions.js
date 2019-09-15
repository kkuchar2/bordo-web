import {userService} from "../../services/userservice";
import {userConstants} from "../../constants/constants";
import {alertActions} from "./alert.actions";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return (dispatch) => {
        userService.login(username, password)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(response) {
        console.log("Login success");
        console.log(response);
        return { type: userConstants.LOGIN_SUCCESS, response }
    }

    function failure(response) {
        console.log("Login failure");
        console.log(response);
        return { type: userConstants.LOGIN_FAILURE, response }
    }
}

function register(email, username, password1, password2) {
    return dispatch => {

        userService.register(email, username, password1, password2)
            .then(
                response => {
                    dispatch(success(response));
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(response) {
        console.log("Registration success");
        console.log(response);
        return { type: userConstants.REGISTER_SUCCESS, response }
    }
    function failure(response) {
        console.log("Registration failure");
        console.log(response);
        return { type: userConstants.REGISTER_FAILURE, response }
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
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