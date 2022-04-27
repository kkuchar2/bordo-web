import {AppDispatch} from "appRedux/store";
import {TFunction} from "react-i18next";
import {NavigateFunction} from "react-router";

export interface ReadyDialogArgs {
    dispatch: AppDispatch,
    translation: TFunction<"translation">,
    navigate?: NavigateFunction
    data?: object
}