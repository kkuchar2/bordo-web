import {createSlice} from "@reduxjs/toolkit";
import {buildApiUrl} from "../../../util";
import axios from "axios";

export const confirmSlice = createSlice({
    name: 'confirmEmail',
    initialState: {
        status: "INIT",
        data: null
    },
    reducers: {
        accountConfirmationTokenSent: state => {
            state.status = "CONFIRMATION_TOKEN_SENT";
            state.data = null;
        },
        accountConfirmationSuccess: state => {
            state.status = "ACCOUNT_CONFIRMED";
            state.data = null;
        },
        accountConfirmationError: (state, action) => {
            state.status = "CONFIRMATION_ERROR";
            state.data = action.payload;
        },
        resetConfirmState: state => {
            state.status = "INIT";
            state.data = null
        }
    }
})

export const tryConfirmAccount = token => {

    return async dispatch => {
        try {
            dispatch(accountConfirmationTokenSent())
            const url = buildApiUrl("confirm-email");
            const response = await axios.post(url, {"key": token});
            if (response === undefined) {
                dispatch(accountConfirmationError(undefined))
                return;
            }
            const responseData = response.data;
            const status = responseData.status;
            const message = responseData.data;

            if (status === 'success') {
                dispatch(accountConfirmationSuccess())
            }
            else {
                dispatch(accountConfirmationError(message))
            }
        }
        catch (e) {
            console.log(e)
            dispatch(accountConfirmationError("Unknown error"))
        }
    }
}


export const selectorAccountConfirm = state => state.confirm

export const {
    accountConfirmationTokenSent,
    accountConfirmationSuccess,
    accountConfirmationError,
    resetConfirmState
} = confirmSlice.actions
export default confirmSlice.reducer