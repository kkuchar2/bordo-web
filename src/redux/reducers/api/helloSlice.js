import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {buildApiUrl} from "appRedux/util.js";
import {getCookie} from "util/CookieManager.js";

const initialState = {
    status: "INIT",
    data: null
};

export const helloSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        hello_received: (state, action) => {
            state.data = action.payload;
        }
    },
});

export const tryGetHello = () => {
    return async dispatch => {
        try {
            const response = await axios.get(buildApiUrl("hello"), {}, {
                headers: {
                    "Authorization": 'Token ' + getCookie("token")
                },
                withCredentials: true
            });

            dispatch(hello_received(response));
        }
        catch (e) {
            console.log(e);
        }
    };
};

export const selectorHello = state => state.hello;
export const {hello_received} = helloSlice.actions;
export default helloSlice.reducer;