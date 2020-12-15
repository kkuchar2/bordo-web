import {themeConstants} from "../constants.jsx";
import {useCallback} from "react";

export const switchThemeRedux = dispatch =>
    useCallback(() => dispatch({type: themeConstants.SWITCH}), [dispatch])