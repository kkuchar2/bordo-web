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