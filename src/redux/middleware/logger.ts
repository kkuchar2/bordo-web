import {AppDispatch} from "appRedux/store";
import {showErrorToast} from "components/Toast/readyToastNotifications";
import {Middleware, MiddlewareAPI} from "redux";
import {RequestStatus} from "tools/client/client.types";

function colorTrace(msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}

export const style2 = 'background: ' +  '#3c3c3c' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const style3 = 'background: ' +  'rgba(255,255,255,0)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const error_style = 'background: ' +  'rgb(101,15,15)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const waiting_style = 'background: ' +  'rgb(118,135,47)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

export const success_style = 'background: ' +  'rgb(48,140,56)' + '; color: ' + '#ffffff' + '; padding: 5px; margin: 5px; font-weight: bold';

const error_messages = {
    404: "Page not found",
    401: "Unauthorized",
    500: "Internal server error",
    400: "Bad request",
    403: "Forbidden",
    409: "Conflict",
    406: "Not acceptable",
    405: "Method not allowed",
    503: "Service unavailable",
    504: "Gateway timeout",
};

export const loggerMiddleware: Middleware = (api: MiddlewareAPI) => (next: AppDispatch) => (action) => {
    const returnValue = next(action);

    if (action.payload?.info?.status)
    {
        const status = action.payload.info.status;
        const code = action.payload.info.httpCode;
        const url = action.payload.info.url;

        if (status === RequestStatus.Failure)
        {
            if (code !== 400 && code !== 401 && code !== 403) {
                showErrorToast(`HTTP ${code} ${error_messages[code]} ${url}`);
            }
            console.log(`%c ${action.type} %c HTTP ${code} ${url}  %c payload:`, error_style, error_style, style3, action.payload);
        }
        else if (status === RequestStatus.Waiting)
        {
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