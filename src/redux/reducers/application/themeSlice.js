import {getCookie, setCookie} from "util/CookieManager.js";

import {createSlice} from "@reduxjs/toolkit";

const saveThemeToCookies = theme => setCookie('theme', theme);

const setApplicationTheme = theme => {
    document.documentElement.setAttribute("class", "");
    document.documentElement.setAttribute("class", theme);
};

export const getThemeFromCookies = () => {
    const cookieTheme = getCookie('theme');
    const initialTheme = cookieTheme === undefined ? 'theme-dark' : cookieTheme;
    saveThemeToCookies(initialTheme);
    setApplicationTheme(initialTheme);
    return initialTheme;
};

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: getThemeFromCookies(),
    },
    reducers: {
        switchTheme: (state) => {
            state.theme = state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
            setCookie('theme', state.theme);
            setApplicationTheme(state.theme);
        }
    },
});

export const switchCurrentTheme = () => async dispatch => dispatch(switchTheme());

export const selectorTheme = state => state.theme;
export const {switchTheme} = themeSlice.actions;
export default themeSlice.reducer;
