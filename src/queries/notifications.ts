import {pusherSubscribe} from 'state/services/pusherService';
import {store} from 'state/store';

import {authPost} from './base';

export interface NotificationChannelInfo {
    channel_name: string;
    auth: string;
}

export interface NotificationSubscription {
    friendshipRequest: (data: any) => void;
}

export const assignNotificationChannel = (subscription: NotificationSubscription | null) => {
    return authPost<NotificationChannelInfo>(['getNotificationChannel'], 'channels/assignNotificationChannel')({
        onSuccess: (response: NotificationChannelInfo) => {
            store.dispatch(pusherSubscribe(response, subscription));
        }
    });
};