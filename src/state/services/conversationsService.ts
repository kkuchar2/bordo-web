import { Dispatch } from 'redux';

import ApiClient from '../../client';
import { AxiosConfigs } from '../../queries/base';
import { conversationsActions as actions } from '../reducers/conversations/conversationsSlice';

import { Conversation, Message } from '@/state/reducers/conversations/conversationsSlice.types';
import { RequestType } from '@/tools/client/client.types';
import { request } from '@/tools/requests';

export const sendMessageToExistingConversation = (conversation: Conversation, message: string, socketId: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'chat/sendMessageExistingConversation',
        action: actions.sendMessageToExistingConversation,
        requestData: {
            channel_name: conversation.channel_name,
            message: message,
            socket_id: socketId
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const sendMessageCreateConversation = (message: string, socketId: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'chat/sendMessageCreateConversation',
        action: actions.sendNewMessageCreateConversation,
        requestData: {
            message: message,
            socket_id: socketId
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const getConversations = (socketID: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.GET,
        url: 'chat/conversations',
        action: actions.getConversations,
        requestData: {
            'socket_id': socketID
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const receiveRoomMessage = (message: Message) => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.registerRoomMessage(message));
    };
};

export const registerSentMessage = (message: Message) => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.registerSentMessage(message));
    };
};

export const resetChatSliceRequestState = (requestStateName: string) => {
    return async (dispatch: Dispatch) => dispatch(actions.resetRequestState(requestStateName));
};