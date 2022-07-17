export const CSRF_CONFIG = {
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN"
};

export const AxiosConfigs = {
    /**
     * Do not send and receive cookies.
     */
    NO_CREDENTIALS: {withCredentials: false},

    /**
     * Send and receive all cookies
     */
    WITH_CREDENTIALS: {withCredentials: true},

    /**
     * Send and receive all cookies.
     * Also, send CSRF token in the header and receive it as a cookie.
     */
    WITH_CREDENTIALS_AND_CSRF: {withCredentials: true, ...CSRF_CONFIG},
};