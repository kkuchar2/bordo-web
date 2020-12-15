import Cookies from "universal-cookie";

export const setCookie = (name, value, path = '/') => new Cookies().set(name, value, {path: path});

export const getCookie = name => new Cookies().get(name);