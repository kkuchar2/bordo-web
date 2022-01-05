import {useEffect} from "react";

import {BaseRequestSliceState} from "appRedux/reducers/generic_reducer";
import {RequestStatus} from "axios-client-wrapper";

export const humanize = (str: string) => {
    let i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export const withRequestSuccess = (state: BaseRequestSliceState, func: Function) => {
    return useEffect(() => {
        if (state.requestState.status === RequestStatus.Success) {
            func();
        }

    }, [state]);
};