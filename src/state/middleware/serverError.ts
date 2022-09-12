import {Dispatch} from '@reduxjs/toolkit';
import {showServiceUnavailableDialog} from 'components/DialogSystem/readyDialogs';
import {Middleware} from 'redux';
import {RequestStatus} from 'tools/client/client.types';

export const serverErrorMiddleware: Middleware = () => (next: Dispatch) => (action) => {
    const returnValue = next(action);

    if (action.payload?.info?.status) {
        const payloadInfo = action.payload.info;

        const status = payloadInfo.status;
        const code = payloadInfo.httpCode;
        const url = payloadInfo.url;

        if (status === RequestStatus.Failure && code === 503) {
            showServiceUnavailableDialog();
        }
        return returnValue;
    }
    return returnValue;
};