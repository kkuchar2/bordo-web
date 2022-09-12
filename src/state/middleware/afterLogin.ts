import {Dispatch} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import {pusherConnect} from 'state/services/pusherService';
import {AppDispatch} from 'state/store';

import {isSuccess} from '../../api/api_util';

const styleOf = (bgColor: string) => `background: ${bgColor}; color: #ffffff; padding: 5px; margin: 5px; font-weight: bold`;

const COLOR1 = styleOf('rgb(11,114,151)');
const COLOR2 = styleOf('transparent');

export const afterLoginMiddleware: Middleware = ({
                                                     dispatch,
                                                     getState
                                                 }: { dispatch: AppDispatch, getState: () => any }) => (next: Dispatch) => (action) => {
    if (action.type === 'account/login' || action.type === 'account/autoLogin') {

        if (isSuccess(action.payload)) {
            console.log(`%c afterLoginMiddleware (logged in) %c ${action.type}`, COLOR1, COLOR2);

            dispatch(pusherConnect());
        }
    }

    return next(action);
};