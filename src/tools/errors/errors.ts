import {Errors} from 'tools/client/client.types';

import {QueryResponseError} from '../../queries/base';

export const getResponseError = (errors: any, key?: string) => {
    if (!errors) {
        return [];
    }

    if (!key) {
        return errors;
    }

    if (errors.length === 0) {
        return [];
    }

    const keyedErrors = errors[key];

    if (keyedErrors) {
        return keyedErrors;
    }
    return [];
};

export const isEmailNotVerifiedError = (error: QueryResponseError) => {

    console.log('A', error);

    if (!error) {
        return false;
    }

    const data = error.data;

    if (!data) {
        return false;
    }

    const detail = data.detail;

    if (!detail) {
        return false;
    }

    const formErrors = detail.form;

    if (!formErrors) {
        return false;
    }

    let nonFieldFormErrors = getResponseError(formErrors, 'non_field_errors');

    if (nonFieldFormErrors.length !== 1) {
        return false;
    }

    const nonField = nonFieldFormErrors[0];

    if (!nonField) {
        return false;
    }

    const message = nonField.message;

    if (!message) {
        return false;
    }

    return message === 'E-mail is not verified.';
};

export const getFieldError = (error: Errors, fieldId: string | undefined) => {

    if (!error) {
        return [];
    }

    const responseError = error.responseError;

    if (!responseError) {
        return [];
    }

    const detail = responseError.detail;

    if (!detail) {
        return [];
    }

    const formErrors = detail.form;

    if (!formErrors) {
        return [];
    }

    if (fieldId in formErrors) {
        return formErrors[fieldId].map(err => err.message);
    }

    return [];
};
