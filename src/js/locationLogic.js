import {isOnAuthenticatedPage, isOnAuthShadowedPage} from "routes/routes.js";
import {getCookie} from "util/CookieManager.js";
import {logOut, tryValidateAuthentication} from "redux/reducers/api/account";

const switchPage = (history, path) => history.replace({pathname: path});

export const locationLogic = (dispatch, history) => {

    const onAuthenticatedPage = isOnAuthenticatedPage();
    const onAuthShadowedPage = isOnAuthShadowedPage();
    const tokenExists = getCookie('token') !== undefined;

    // console.log(`Location logic, path: ${window.location.pathname }`);
    if (!tokenExists) {
        console.log("Token does not exist");
        dispatch(logOut());
    }
};