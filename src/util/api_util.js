export const getResponseError = (errors, context, key) => {
    if (!errors || !context)
    {
        return [];
    }

    if (context === 'generic')
    {
        const anyErrors = errors['generic'];
        return anyErrors ? anyErrors : [];
    }

    if (context === 'form' && key)
    {
        const formContextErrors = errors['form'];

        if (formContextErrors) {
            const formErrors = formContextErrors[key];
            return formErrors ? formErrors : [];
        }
        return [];
    }

    return [];
};

export const getFormFieldError = (errors, fieldId) => getResponseError(errors, 'form', fieldId);

export const createError = (errorType, errorMessage, errorSource) => {
    return {
        'type' : errorType,
        'message' : errorMessage,
        'source' : errorSource
    };
};

export const createNetworkError = (source) => {
    return {
        "generic": [createError("network_error", "NETWORK_ERROR", source)]
    };
};