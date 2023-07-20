import { Dispatch } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { AppDispatch } from '@/state/store';

const styleOf = (bgColor: string) => `background: ${bgColor}; color: #ffffff; padding: 5px; margin: 5px; font-weight: bold`;

const COLOR1 = styleOf('rgb(11,114,151)');
const COLOR2 = styleOf('transparent');

export const afterLoginMiddleware: Middleware = ({
    dispatch,
    getState
}: {
    dispatch: AppDispatch,
    getState: () => any
}) => (next: Dispatch) => (action) => {
    return next(action);
};
