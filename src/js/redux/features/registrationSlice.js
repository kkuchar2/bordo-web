import {createSlice} from "@reduxjs/toolkit";
import {parseResponse, sendPostRequest} from "../util.js";
import {registrationConstants} from "../constants";

export const register = sendPostRequest('rest-auth/register/');

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        status: "INIT",
        data: null
    },
    extraReducers: {
        [registrationConstants.RESET]: state => {
            state.status = "INNIT";
            state.data = null
        },
        [register.pending]: state => {
            state.status = 'SENT_REGISTRATION_REQUEST';
        },
        [register.fulfilled]: (state, action) => {
            const [httpCode, json] = parseResponse(action)

            if (httpCode === 200 || httpCode === 201) {
                const status = json['status'];
                const data = json['data'];

                if (status === 'error') {
                    state.status = "INIT"
                    state.data = data
                }
                else {
                    state.status = "REGISTRATION_COMPLETE"
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

export default registrationSlice.reducer;