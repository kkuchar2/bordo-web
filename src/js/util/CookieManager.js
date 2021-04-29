import Cookies from "universal-cookie";

export const setCookie = (name, value) => {
    new Cookies().set(name, value, {path: '/', maxAge: 10000000}, {secure: true, httpOnly: true});
};

export const removeCookie = (name) => {
    new Cookies().remove(name);
};

export const getCookie = name => new Cookies().get(name);

export const hasCookie = name => new Cookies().get(name) !== undefined;