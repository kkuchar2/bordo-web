import {useEffect} from "react";

import {closeDialog} from "state/reducers/dialog/dialogSlice";
import {AppDispatch} from "state/store";

import {isSuccess} from "../../api/api_util";

export const useCloseWithRequestSuccess = (dispatch: AppDispatch, requestState: any) => useEffect(() => {
    if (isSuccess(requestState)) {
        dispatch(closeDialog());
    }
}, [requestState]);