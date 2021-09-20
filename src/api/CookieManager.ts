import Cookies from "universal-cookie";

export const setCookie = (name: string, value: string) => {
    new Cookies().set(name, value, {path: '/', maxAge: 10000000, secure: true, httpOnly: true});
};

export const removeCookie = (name: string) => {
    new Cookies().remove(name);
};

export const getAllCookies = () => {
    return new Cookies().getAll();
};

export const getCookie = (name: string) => new Cookies().get(name);

export const hasCookie = (name: string) => new Cookies().get(name) !== undefined;