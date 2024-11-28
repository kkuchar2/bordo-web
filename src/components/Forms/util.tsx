import { FieldError, NonFieldError, ValidationResponse } from '@/queries/base';

const mapError = (error: FieldError): string | null => {
    if (!error.field || !error.code || !error.message) {
        return null;
    }

    return error.message;
};

const mapNonFieldError = (error: NonFieldError): string | null => {
    if (!error.code || !error.message) {
        return null;
    }

    return error.message;
};

export const getFieldValidationError = (validationResponse: ValidationResponse | undefined, fieldName: string): string[] => {

    if (!validationResponse) {
        return [];
    }

    const fieldErrors = validationResponse.fieldErrors;

    if (!fieldErrors) {
        return [];
    }

    const fieldErrorsArr = fieldErrors[fieldName];

    if (!fieldErrorsArr) {
        return [];
    }

    return fieldErrorsArr.map(mapError).filter<string>((x): x is string => x !== null);
};

export const getNonFieldErrors = (validationResponse: ValidationResponse | undefined) => {

    if (!validationResponse) {
        return [];
    }

    const nonFieldErrors = validationResponse.nonFieldErrors;

    if (!nonFieldErrors) {
        return [];
    }

    return (nonFieldErrors || []).map(mapNonFieldError).filter<string>((x): x is string => x !== null);
};