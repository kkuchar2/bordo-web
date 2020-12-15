import {themeConstants} from "redux/constants.jsx";
import {getCookie, setCookie} from "util/CookieManager.js";

const getThemeFromCookies = () => {
    const cookieTheme = getCookie('theme');
    const initialTheme = cookieTheme === undefined ? 'theme-dark' : cookieTheme;
    saveThemeToCookies(initialTheme);
    setApplicationTheme(initialTheme);
    return initialTheme;
}

const saveThemeToCookies = theme => setCookie('theme', theme);

const setApplicationTheme = theme => {
    console.log("Setting app theme to: " + theme);
    document.documentElement.setAttribute("class", "");
    document.documentElement.setAttribute("class", theme);
}

const getSwitchedTheme = state => state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';

const initialState = {theme: getThemeFromCookies()}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case themeConstants.SWITCH:
            const nextTheme = getSwitchedTheme(state);
            setApplicationTheme(nextTheme);
            saveThemeToCookies(nextTheme);
            return {theme: nextTheme};
        default:
            return state
    }
}