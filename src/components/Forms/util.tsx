import { TFunction } from 'i18next';

import { ErrorText } from '@/components/ErrorText/ErrorText';
import { QueryResponseErrorData } from '@/queries/base';

type Error = {
    code: string;
    message: string;
}

const mapError = (fieldError: Error) => {
    if (!fieldError.code || !fieldError.message) {
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
    else if (fieldError.code === 'max_length') {
        return fieldError.message;
    }
    else if (fieldError.code === 'already_exists') {
        return fieldError.message;
    }

    return 'Error with field';
};

export const getFormFieldErrors = (error: any, fieldName: string) => {
    if (!error) {
        return null;
    }

    const formErrors = error.form;

    if (!formErrors) {
        return null;
    }
    const fieldErrors = formErrors[fieldName];

    if (!fieldErrors) {
        return null;
    }

    return fieldErrors.map(mapError);
};

export const getNonFieldErrors = (error: QueryResponseErrorData) => {

    if (!error) {
        return [];
    }

    const formErrors = error.form;

    if (!formErrors) {
        return [];
    }

    return (formErrors['non_field_errors'] ?? []).map(mapError);
};

export const renderNonFieldErrors = (error: QueryResponseErrorData, t: TFunction<'translation'>, excludeList?: string[]) => {
    return <div className={'flex flex-col items-stretch gap-[5px]'}>
        {
            getNonFieldErrors(error)
                .filter(function (err: QueryResponseErrorData) {
                    if (!excludeList) {
                        return true;
                    }
                    return !excludeList.includes(err);
                })
                .map((error: any, idx: number) => {
                    return <ErrorText key={idx}>{t(error)}</ErrorText>;
                })
        }
    </div>;
};
