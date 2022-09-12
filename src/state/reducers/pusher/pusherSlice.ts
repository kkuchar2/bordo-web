import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {PusherState, PusherSubscribeArgs, PusherTriggerArgs} from './pusherSlice.types';

export const pusherSlice = createSlice({
    name: 'pusher',
    initialState: {
        auths: {},
        socketId: null
    } as PusherState,
    reducers: {
        auth: (state: PusherState, action: PayloadAction<any>) => {
            const { channel, socketId, auth } = action.payload;
            state.auths[socketId] = {
                ...state.auths[socketId] || {},
                [channel]: auth
            };
        },
        connect: (state: PusherState, action: PayloadAction) => {
        },
        disconnect: (state: PusherState, action: PayloadAction) => {
        },
        subscribe: (state: PusherState, action: PayloadAction<PusherSubscribeArgs>) => {
        },
        unsubscribe: (state: PusherState, action: PayloadAction<string>) => {
        },
        trigger: (state: PusherState, action: PayloadAction<PusherTriggerArgs>) => {
        },
        onConnectionEstablished: (state: PusherState, action: PayloadAction<string>) => {
            state.socketId = action.payload;
        }
    }
});

export const { actions: pusherActions } = pusherSlice;

export default pusherSlice.reducer;
