export const getResponseError = (errors: any, context: string, key?: string) => {
    if (!errors || !context) {
        return [];
    }

    if (context === 'request' && errors.length === 1) {
        const requestErrors = errors[0].request;
        return requestErrors ? requestErrors : [];
    }

    if (context === 'generic' && errors.length === 1) {
        const anyErrors = errors[0].generic;
        return anyErrors ? [anyErrors] : [];
    }

    if (context === 'form' && key) {

        if (errors.length > 1 || errors.length === 0) {
            return [];
        }

        const formContextErrors = errors[0]['form'];

        if (formContextErrors) {
            const formErrors = formContextErrors[key];
            return formErrors ? formErrors : [];
        }
        return [];
    }

    return [];
};

export const getFormFieldError = (errors: any, fieldId: string | undefined) => {
    return getResponseError(errors, 'form', fieldId);
};