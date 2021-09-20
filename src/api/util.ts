import {DependencyList, useCallback, useEffect} from "react";

import {AppDispatch} from "appRedux/store";
import {RequestStatus} from "axios-client-wrapper";

export const retry = (func: { (): any; (): Promise<unknown>; }, retriesLeft = 5, interval = 1000) =>
    new Promise((resolve, reject) => func()
        .then(resolve)
        .catch((error: any) => {
            setTimeout(() => {
                if (retriesLeft === 1) {
                    reject(error);
                    return;
                }
                retry(func, retriesLeft - 1, interval).then(resolve, reject);
            }, interval);
        }));

// Trigger hook on deps change only if all deps are not null and not undefined
export const useEffectWithNonNull = (func: () => void, deps: ReadonlyArray<any>) =>
    useEffect(() => {
        for (let i = 0; i < deps.length; i++) {
            let dep = deps[i];
            if (dep === null || dep === undefined || dep === 0 || dep == null || dep === 0) {
                return;
            }
        }
        func();
    }, deps);

export const withRequestComplete = (selector: any, path: string, onComplete: Function) => {
    useEffect(() => {
        const isCorrectContext = selector.path === path;
        const isPending = selector.requestState.pending;
        const isSuccess = selector.requestState.status === RequestStatus.Success;

        if (isCorrectContext && !isPending && isSuccess) {
            onComplete();
        }
    }, [selector]);
};

// Hook for unmount
export const useEffectWithUnmount = (func: () => void) => {
    useEffect(() => {
        func();
    }, []);
};

// Trigger hook on deps change only if boolVar is true
export const useEffectOnTrue = (boolVar: boolean, func: () => void, deps: DependencyList) => {
    useEffect(() => {
        if (boolVar) {
            func();
        }
    }, deps);
};

// Trigger hook on deps change only if boolVar is true and deps not null
export const filteredBoolUseEffect = (boolVar: boolean, func: () => void, deps: DependencyList) =>
    useEffect(() => {
        for (let i = 0; i < deps.length; i++) {
            let dep = deps[i];
            if (dep === null || dep === undefined) {
                return;
            }
        }

        if (!boolVar) {
            func();
        }
    }, deps);

export const callbackOf = (dispatch: AppDispatch, func: (dispatch: AppDispatch) => void) => {
    useCallback(() => {
        func(dispatch);
    }, [dispatch]);
};

export const withCondition = (variable: any, func: () => void) => {
    if (variable) {
        return func();
    }
};