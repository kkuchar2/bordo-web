import {NotificationChannelInfo, NotificationSubscription} from 'queries/notifications';
import {Dispatch} from 'redux';

import {pusherActions as actions} from './../reducers/pusher/pusherSlice';

export const pusherConnect = () => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.connect());
    };
};

export const pusherDisconnect = () => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.disconnect());
    };
};

export const pusherSubscribe = (data: NotificationChannelInfo, subscription: NotificationSubscription) => {

    const { channel_name, auth } = data;

    return async (dispatch: Dispatch) => {
        await dispatch(actions.subscribe({ channel_name, auth, subscription }));
    };
};

export const pusherUnsubscribe = (channel: string) => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.unsubscribe(channel));
    };
};

export const pusherTrigger = (channel: string, event: string, data: any) => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.trigger({ channel, event, data }));
    };
};

export const onConnectionEstablished = (socketId: string) => {
    return async (dispatch: Dispatch) => {
        await dispatch(actions.onConnectionEstablished(socketId));
    };
};