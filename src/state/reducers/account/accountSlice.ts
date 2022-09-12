import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {requestList} from 'state/reducers/account/constants';
import {DefaultResponseArgs} from 'tools/client/client.types';
import {mapFrom} from 'util/util';

import {requestReducer} from '../tools';

import {AccountSliceState} from './accountSlice.requests';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        requests: mapFrom(requestList, DefaultResponseArgs()),
    } as AccountSliceState,
    reducers: {
        disconnectFromGoogle: requestReducer('disconnectFromGoogle'),

        resetRequestState: (state: AccountSliceState, action: PayloadAction<any>) => {
            state.requests[action.payload] = DefaultResponseArgs();
        }
    }
});

export const { actions: accountActions } = accountSlice;

export default accountSlice.reducer;
