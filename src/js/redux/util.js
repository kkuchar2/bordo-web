import {client} from "redux/api/client.js";
import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const BASE_API_URL_DEVELOPMENT = "http://0.0.0.0:5000/api/"

const BASE_API_URL_PRODUCTION = "https://klkucharski-api.com/api/"

const buildApiUrl = name => BASE_API_URL_DEVELOPMENT + name

const buildThunkId = name => name + "/fetch" + name;

export const buildAsyncCall = name => async () => await client.get(buildApiUrl(name));

export const buildDefaultAsyncThunk = name => createAsyncThunk(buildThunkId(name), buildAsyncCall(name));

export const buildDefaultSlice = (name, thunk) => {

    const adapter = createEntityAdapter();

    return createSlice({
        name: name,
        initialState: adapter.getInitialState(),
        reducers: {},
        extraReducers: {
            [thunk.fulfilled]: adapter.setAll,
        },
    }).reducer
};

export const createDefaultEntityAdapter = createEntityAdapter;