import {themeConstants} from "../constants.js";
import {useCallback} from "react";

export const switchThemeRedux = dispatch =>
    useCallback(() => dispatch({type: themeConstants.SWITCH}), [dispatch])