import {Dispatch} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import {onConnectionEstablished} from 'state/services/pusherService';
import {AppDispatch} from 'state/store';
import Cookies from 'universal-cookie';

const Pusher = require('pusher-js');

const styleOf = (bgColor: string) => `background: ${bgColor}; color: #ffffff; padding: 5px; margin: 5px; font-weight: bold`;

const COLOR1 = styleOf('rgb(92,49,138)');
const COLOR2 = styleOf('transparent');

let client = null;

Pusher.Runtime.createXHR = function () {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
};

export const channelMiddleware: Middleware = ({
                                                  dispatch,
                                                  getState
                                              }: { dispatch: AppDispatch, getState: () => any }) => (next: Dispatch) => (action) => {
    if (action.type === 'pusher/connect') {

        if (client === null) {
            console.log('%c channelMiddleware %c Starting channel connection to 127.0.0.1:6001', COLOR1, COLOR2);

            client = new Pusher('6235567323452347258248', {
                wsHost: '127.0.0.1',
                wsPort: 6001,
                forceTLS: false,
                channelAuthorization: {
                    withCredentials: true,
                    endpoint: 'http://localhost:8000/api/channels/authChannel',
                    headers: {
                        'X-CSRFTOKEN': new Cookies().get('csrftoken')
                    },
                },
                encrypted: true,
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
        client.disconnect();
    }
    else if (action.type === 'pusher/send') {
        const { channel, event, data } = action.payload;
        client.trigger(channel, event, data);
    }
    else if (action.type === 'pusher/subscribe') {
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
        const { channel } = action.payload;
        client.unsubscribe(channel);
    }

    return next(action);
};

export const getSocketId = () => {
    if (client === null) {
        return null;
    }
    return client.connection.socket_id;
};