import {Dispatch} from '@reduxjs/toolkit';
import {Middleware} from 'redux';

const styleOf = (bgColor: string) => `background: ${bgColor}; color: #ffffff; padding: 5px; margin: 5px; font-weight: bold`;

const style1 = styleOf('#3c3c3c');
const style2 = styleOf('rgba(255,255,255,0)');
const error = styleOf('rgb(101,15,15)');
const waiting = styleOf('rgb(118,135,47)');
const success = styleOf('rgb(48,140,56)');

export const loggerMiddleware: Middleware = () => (next: Dispatch) => (action) => {
    if (action.payload?.info?.status) {
        const payloadInfo = action.payload.info;

        const status = payloadInfo.status;
        const code = payloadInfo.httpCode;
        const url = payloadInfo.url;

        // if (status === RequestStatus.Failure) {
        //     console.log(`%c ${action.type} %c HTTP ${code} ${url}  %c payload:`, error, error, style2, action.payload);
        // }
        // else if (status === RequestStatus.Success) {
        //     console.log(`%c ${action.type} %c HTTP ${code} %c payload:`, success, success, style2, action.payload);
        // }
        return next(action);
    }

    // console.log(`%c ${action.type} %c payload:`, style1, style2, action.payload);
    return next(action);
};