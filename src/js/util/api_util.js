export const getResponseError = (data, key) => {
    if (data === null) {
        return undefined;
    }

    return data[key];
}