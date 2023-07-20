import { NotificationSubscription } from '../../../queries/notifications';

export interface PusherState {
    auths: SocketAuthInfo;
    socketId: string | null;
}

export interface PusherTriggerArgs {
    channel: string;
    event: string;
    data: any;
}

export interface PusherSubscribeArgs {
    channel_name: string;
    auth: string;
    subscription: NotificationSubscription
}

export interface ChannelAuthInfo {
    [channelName: string]: string;
}

export interface SocketAuthInfo {
    [socketId: string]: ChannelAuthInfo;
}