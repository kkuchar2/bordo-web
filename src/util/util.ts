import _ from "lodash";

export const humanize = (str: string) => {
    let i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export const mapFrom = <T> (arr: string[], defaultValue: T)  => {
    const map = {};
    _.each(arr, val => map[val] = defaultValue);
    return map;
};

export const mapOfSelectors = (arr: string[], selectorProvider: (key: string) => any)  => {
    const map = {};
    _.each(arr, val => map[val] = selectorProvider(val));
    return map;
};