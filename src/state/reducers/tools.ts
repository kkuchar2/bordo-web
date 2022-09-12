import {PayloadAction} from '@reduxjs/toolkit';
import {AccountSliceState} from 'state/reducers/account/accountSlice.requests';
import {ResponseArgs} from 'tools/client/client.types';

export type RequestAction = PayloadAction<ResponseArgs>;

export const requestReducer = (requestName: string) => (state: AccountSliceState, action: RequestAction) => {
    state.requests[requestName] = action.payload;
};
