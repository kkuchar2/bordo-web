import {AppDispatch} from "appRedux/store";
import {showResponseError} from "components/Toast/readyToastNotifications";
import {Middleware} from "redux";
import {RequestStatus} from "tools/client/client.types";

export const style2 = 'background: ' + '#3c3c3c' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const style3 = 'background: ' + 'rgba(255,255,255,0)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const error_style = 'background: ' + 'rgb(101,15,15)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const waiting_style = 'background: ' + 'rgb(118,135,47)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const success_style = 'background: ' + 'rgb(48,140,56)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const loggerMiddleware: Middleware = () => (next: AppDispatch) => (action) => {
    const returnValue = next(action);

    if (action.payload?.info?.status) {
        const status = action.payload.info.status;
        const data = JSON.stringify(action.payload.info.errors);
        const code = action.payload.info.httpCode;
        const url = action.payload.info.url;

        if (status === RequestStatus.Failure) {
            showResponseError(code, url, data);
            console.log(`%c ${action.type} %c HTTP ${code} ${url}  %c payload:`, error_style, error_style, style3, action.payload);
        }
        else if (status === RequestStatus.Waiting) {
            console.log(`%c ${action.type} %c PENDING %c payload:`, waiting_style, waiting_style, style3, action.payload);
        }
        else {
            console.log(`%c ${action.type} %c HTTP ${code} %c payload:`, success_style, success_style, style3, action.payload);
        }
        return returnValue;
    }

    console.log(`%c ${action.type} %c payload:`, style2, style3, action.payload);
    //console.log('%c State after dispatch', 'background: ' +  '#6019a5' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold', api.getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.

    return returnValue;
};