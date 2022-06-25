const mapFieldError = (fieldError: any) => {
    if (!fieldError.code || !fieldError.message)
    {
        return null;
    }

    if (fieldError.code === 'required') {
        return 'This field is required';
    }
    else if (fieldError.code === 'password_too_short') {
        return fieldError.message;
    }
    else if (fieldError.code === 'password_too_common') {
        return fieldError.message;
    }
    else if (fieldError.code === 'invalid') {
        return fieldError.message;
    }
    else if (fieldError.code === 'already_exists') {
        return fieldError.message;
    }

    return 'Error with field';
};

export const getFormFieldErrors = (errors: any, fieldName: string) => {
    let responseError = errors.responseError;

    if (!responseError)
    {
        return null;
    }

    const detail = responseError.detail;

    if (!detail)
    {
        return null;
    }

    const formErrors = detail.form;

    if (!formErrors)
    {
        return null;
    }

    const fieldErrors = formErrors[fieldName];

    if (!fieldErrors)
    {
        return null;
    }

    return fieldErrors.map(mapFieldError);
};