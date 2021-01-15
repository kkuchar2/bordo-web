import {createSlice} from "@reduxjs/toolkit";
import {sendPostRequest, parseResponse} from "../util.js";
import {loginConstants} from "../constants";

export const login = sendPostRequest('rest-auth/login/');

const loginSlice = createSlice({
    name: 'register',
    initialState: {
        status: "INIT",
        data: null
    },
    extraReducers: {
        [loginConstants.RESET]: state => {
            state.status = "INIT";
            state.data = null
        },
        [login.pending]: state => {
            state.status = 'SENT_LOGIN_REQUEST';
        },
        [login.fulfilled]: (state, action) => {
            const [httpCode, json] = parseResponse(action)

            if (httpCode === 200 || httpCode === 201) {
                const status = json['status'];
                const data = json['data'];

                if (status === 'error') {
                    state.status = "INIT"
                    state.data = data
                }
                else {
                    state.status = "INIT"
                    state.data = data
                }
            }
            else {
                state.status = 'INIT'
                state.data = data
            }
        }
    }
})

export default loginSlice.reducer;