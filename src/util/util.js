import React, {lazy, useCallback, useEffect} from "react";

import packageJson from "../../package.json";

export const getBuildDate = () => packageJson.buildDate;

export const getParentHeight = thisMount => thisMount.current.offsetHeight;

export const getParentWidth = thisMount => thisMount.current.offsetWidth;

export const lazyImport = importFunc => lazy(() => retry(() => importFunc()));

export const retry = (func, retriesLeft = 5, interval = 1000) =>
    new Promise((resolve, reject) => func()
        .then(resolve)
        .catch((error) => {
            setTimeout(() => {
                if (retriesLeft === 1) {
                    reject(error);
                    return;
                }
                retry(func, retriesLeft - 1, interval).then(resolve, reject);
            }, interval);
        }));

// Trigger hook on deps change only if all deps are not null and not undefined
export const useEffectWithNonNull = (func, deps) =>
    useEffect(() => {
        for (let i = 0; i < deps.length; i++) {
            let dep = deps[i];
            if (dep === null || dep === undefined || dep == 0 || dep == null || dep === 0) {
                return;
            }
        }
        func();
    }, deps);

// Hook for unmount
export const useEffectWithUnmount = func => useEffect(() => func, []);

// Trigger hook on deps change only if boolVar is true
export const useEffectOnTrue = (boolVar, func, deps) =>
    useEffect(() => {
        if (boolVar === true) {
            func();
        }
    }, deps);

// Trigger hook on deps change only if boolVar is true and deps not null
export const filteredBoolUseEffect = (boolVar, func, deps) =>
    useEffect(() => {
        for (let i = 0; i < deps.length; i++) {
            let dep = deps[i];
            if (dep === null || dep === undefined) {
                return;
            }
        }

        if (boolVar === false) {
            func();
        }
    }, deps);

export const notifyError = msg => {
    return toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const callbackOf = (dispatch, func) => useCallback(() => func(dispatch), [dispatch]);

export const withCondition = (variable, func) => {
    if (variable) {
        return func();
    }
};

export const withStatus = (status, statusName, func) => {
    if (status === statusName) {
        return func();
    }
};

export const withNotStatus = (status, statusName, func) => {
    if (status !== statusName) {
        return func();
    }
};

export const logPosition = (value, min, max) => {
    const minPosition = 0;
    const maxPosition = 100;
    const minValue = Math.log(min);
    const maxValue = Math.log(max);
    const scale = (maxValue - minValue) / (maxPosition - minPosition);
    return (Math.log(value) - minValue) / scale + minPosition;
};

export const logSlider = (position, min, max) => {
    const minPosition = 0;
    const maxPosition = 100;
    const minValue = Math.log(min);
    const maxValue = Math.log(max);
    const scale = (maxValue - minValue) / (maxPosition - minPosition);
    return Math.exp(minValue + scale * (position - minPosition));
};
