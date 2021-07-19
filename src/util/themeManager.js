import Cookies from "universal-cookie";

const themes = ['theme-light', 'theme-dark']

export const set = (func) => {
    const cookies = new Cookies();
    let lastTheme = cookies.get('theme');
    if (lastTheme !== undefined) {
        if (lastTheme === 'theme-dark') {
            func(true);
        }
        else {
            func(false);
        }
    }
    else {
        func(false);
    }
}