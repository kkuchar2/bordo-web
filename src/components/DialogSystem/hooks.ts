import {useEffect} from "react";

import {closeDialog} from "appRedux/reducers/application";
import {AppDispatch} from "appRedux/store";

import {isSuccess} from "../../api/api_util";

export const useCloseWithRequestSuccess = (dispatch: AppDispatch, requestState: any) => useEffect(() => {
    if (isSuccess(requestState)) {
        dispatch(closeDialog());
    }
}, [requestState]);