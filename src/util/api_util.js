export const getResponseError = (data, key) => {
    if (data === null || data === undefined) {
        return undefined;
    }

    return data[key];
}