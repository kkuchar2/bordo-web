import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultResponseArgs, ResponseArgs} from 'tools/client/client.types';
import {mapFrom} from 'util/util';

import {isSuccess} from '../../../api/api_util';

import {requestList} from './constants';
import {ConversationsSliceState} from './conversationsSlice.requests';
import {Message} from './conversationsSlice.types';

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: {
        requests: mapFrom(requestList, DefaultResponseArgs()),
        conversations: []
    } as ConversationsSliceState,
    reducers: {

        getConversations: (state: ConversationsSliceState, action: PayloadAction<any>) => {
            state.requests.conversations = action.payload;

            if (isSuccess(action.payload)) {
                console.log('Conversations response: ', action.payload.responseData);
                state.conversations = action.payload.responseData;
            }
        },

        registerRoomMessage: (state: ConversationsSliceState, action: PayloadAction<Message>) => {
            const { sender, } = action.payload;

            console.log('Registering room message: ', action.payload);

            state.messages[sender] = [...state.messages[sender] || [], action.payload];
        },

        sendMessageToExistingConversation: (state: ConversationsSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.requestSendMessageConversation = action.payload;

            if (isSuccess(action.payload)) {
                console.log('Message request authorized: ', action.payload.responseData);
            }
        },

        sendNewMessageCreateConversation: (state: ConversationsSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.requestSendMessageNewConversation = action.payload;

            if (isSuccess(action.payload)) {
                console.log('Message request authorized: ', action.payload.responseData);
            }
        },

        registerSentMessage: (state: ConversationsSliceState, action: PayloadAction<Message>) => {
            const { receiver, } = action.payload;

            console.log('Registering sent message: ', action.payload);

            state.messages[receiver] = [...state.messages[receiver] || [], action.payload];
        },

        resetRequestState: (state: ConversationsSliceState, action: PayloadAction<any>) => {
            state.requests[action.payload] = DefaultResponseArgs();
        }
    }
});

export const { actions: conversationsActions } = conversationsSlice;

export default conversationsSlice.reducer;
