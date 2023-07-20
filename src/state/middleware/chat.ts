import { Dispatch } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { AppDispatch } from '@/state/store';

const styleOf = (bgColor: string) => `background: ${bgColor}; color: #ffffff; padding: 5px; margin: 5px; font-weight: bold`;

const COLOR1 = styleOf('rgb(92,49,138)');
const COLOR2 = styleOf('transparent');

let client = null;

export const chatMiddleware: Middleware = ({
    dispatch,
    getState
}: { dispatch: AppDispatch, getState: () => any }) => (next: Dispatch) => (action) => {
    if (action.type === 'chat/requestSendMessage') {
        //
        // if (isSuccess(action.payload)) {
        //
        //     console.log(`%c chatMiddleware %c ${action.type}`, COLOR1, COLOR2);
        //     console.log(action.payload);
        //     const state = getState();
        //     const account = state.account;
        // }
    }

    return next(action);
};
