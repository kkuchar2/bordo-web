export const getResponseError = (errors: any, context: string, key?: string) => {
    if (!errors || !context) {
        return [];
    }

    if (context === 'generic') {
        const anyErrors = errors['generic'];
        return anyErrors ? anyErrors : [];
    }

    if (context === 'form' && key) {
        const formContextErrors = errors['form'];

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

export const createError = (errorType: string, errorMessage: string, errorSource: string) => {
    return {
        'type': errorType,
        'message': errorMessage,
        'source': errorSource
    };
};