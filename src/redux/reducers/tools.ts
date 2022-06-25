import {mapOfSelectors} from "util/util";

import {PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "appRedux/store";
import { ResponseArgs} from "tools/client/client.types";

import { IAuthSliceState } from "./api/user/userSlice.requests";

export const requestSelectors = <SelectorMapType> (sliceProvider: (state: RootState) => any, requestList: string[]) => {
    return mapOfSelectors(requestList, (requestName: string) => {
        return (state: RootState) => sliceProvider(state).requests[requestName];
    }) as SelectorMapType;
};

export type RequestAction = PayloadAction<ResponseArgs>;

export const requestReducer = (requestName: string) => (state: IAuthSliceState, action: RequestAction) => {
    state.requests[requestName] = action.payload;
};