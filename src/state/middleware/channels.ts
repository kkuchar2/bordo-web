import { Dispatch } from '@reduxjs/toolkit';
import Pusher from 'pusher-js';
import { Middleware } from 'redux';
import Cookies from 'universal-cookie';

import { getEnvVar, isPusherEnvSet } from '@/config';
import { onConnectionEstablished } from '@/state/services/pusherService';
import { AppDispatch } from '@/state/store';

const styleOf = (bgColor: string) => `background: ${bgColor}; color: #ffffff; padding: 5px; margin: 5px; font-weight: bold`;

const COLOR1 = styleOf('rgb(92,49,138)');
const COLOR2 = styleOf('transparent');

let client = null;

Pusher.Runtime.createXHR = function () {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
};

export const channelMiddleware: Middleware = ({
    dispatch,
    getState
}: {
    dispatch: AppDispatch,
    getState: () => any
}) => (next: Dispatch) => (action) => {
    if (action.type === 'pusher/connect') {

        if (!isPusherEnvSet) {
            console.log('Pusher configuration is missing');
            return next(action);
        }

        if (client === null) {
            console.log('%c channelMiddleware %c Starting channel connection to 127.0.0.1:6001', COLOR1, COLOR2);

            client = new Pusher(getEnvVar('NEXT_PUBLIC_PUSHER_API_KEY'), {
                wsHost: getEnvVar('NEXT_PUBLIC_PUSHER_WS_HOST'),
                wsPort: getEnvVar('NEXT_PUBLIC_PUSHER_WS_PORT'),
                forceTLS: false,
                channelAuthorization: {
                    transport: 'ajax',
                    endpoint: `${getEnvVar('NEXT_PUBLIC_BORDO_API_URL')}.channels/authChannel`,
                    params: {
                        withCredentials: true
                    },
                    headers: {
                        'X-CSRFTOKEN': new Cookies().get('csrftoken')
                    },

                },
                disableStats: false,
                enabledTransports: ['ws', 'wss'],
            });

            client.connection.bind('error', (error) => {
                console.log('%c channelMiddleware %c Connection error:', COLOR1, COLOR2, error);
            });

            client.connection.bind('connecting', () => {
                console.log('%c channelMiddleware %c Connecting...', COLOR1, COLOR2);
            });

            client.connection.bind('connected', () => {
                console.log('%c channelMiddleware %c Connected', COLOR1, COLOR2);
                dispatch(onConnectionEstablished(client.connection.socket_id));
            });
        }
    }
    else if (action.type === 'pusher/disconnect') {
        if (!isPusherEnvSet) {
            console.log('Pusher configuration is missing');
            return next(action);
        }

        client.disconnect();
    }
    else if (action.type === 'pusher/send') {
        if (!isPusherEnvSet) {
            console.log('Pusher configuration is missing');
            return next(action);
        }

        const { channel, event, data } = action.payload;
        client.trigger(channel, event, data);
    }
    else if (action.type === 'pusher/subscribe') {
        if (!isPusherEnvSet) {
            console.log('Pusher configuration is missing');
            return next(action);
        }

        const { channel_name, auth, subscription } = action.payload;

        console.log('%c channelMiddleware %c Subscribing to channel:', COLOR1, COLOR2, channel_name);
        const chan = client.subscribe(channel_name);
        console.log(chan);
        if (!subscription) {
            return;
        }

        for (const [event, callback] of Object.entries(subscription)) {

            if (callback) {
                chan.bind(event, callback);
            }
        }
    }
    else if (action.type === 'pusher/unsubscribe') {
        if (!isPusherEnvSet) {
            console.log('Pusher configuration is missing');
            return next(action);
        }

        const { channel } = action.payload;
        client.unsubscribe(channel);
    }

    return next(action);
};

export const getSocketId = () => client ? client.connection.socket_id : null;
