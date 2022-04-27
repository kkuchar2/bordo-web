import {fieldTypes} from "./fieldTypes";

export const FORM_CONFIG = {
    registration: [
        'email',
        'username',
        'password'
    ],
    login: [
        'email',
        'password'
    ],
    forgotPassword: [
        'email'
    ],
    changeEmail: [
        'new_email',
        'password'
    ]
};

export const getConfig = (cfg, key, t) => {
    const formCfg = cfg[key];

    if (!formCfg) {
        console.error(`Form config key ${key} not found`);
        return null;
    }

    const result = {};
    formCfg.forEach(field => result[field] = fieldTypes[field](t));
    return result;
};