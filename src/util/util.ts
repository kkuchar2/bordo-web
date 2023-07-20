import _ from 'lodash';

import { User } from '@/queries/account/types';

export const humanize = (str: string) => {
    let i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export const mapFrom = <T>(arr: string[], defaultValue: T) => {
    const map = {};
    _.each(arr, val => map[val] = defaultValue);
    return map;
};

export interface FormData {
    [key: string]: any;
}

export const getAvatar = (user: User) => {
    const profile = user?.profile;

    if (!profile) {
        return null;
    }
    return profile.avatar;
};