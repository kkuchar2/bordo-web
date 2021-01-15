import {client} from "redux/api/client.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

const BASE_API_URL_DEVELOPMENT = "http://0.0.0.0:5000/api/"

const BASE_API_URL_PRODUCTION = "https://klkucharski-api.com/api/"

const buildApiUrl = name => BASE_API_URL_DEVELOPMENT + name

export const parseResponse = (action) => {
    const payload = action.payload;
    return [payload.httpCode, payload.json]
}

export const sendGetRequest = name => createAsyncThunk(name, async () => await client.get(buildApiUrl(name)));

export const sendPostRequest = name => createAsyncThunk(name,  async body => await client.post(buildApiUrl(name), body));