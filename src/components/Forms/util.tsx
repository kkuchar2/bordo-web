import React from 'react';

import {VStack} from '@chakra-ui/react';
import {ErrorText} from 'components/chakra/ErrorText/ErrorText';
import {TFunction} from 'react-i18next';

import {QueryResponseErrorData} from '../../queries/base';

interface Error {
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
    console.log('Getting field errors for', fieldName);
    if (!error) {
        return null;
    }

    const formErrors = error.form;

    if (!formErrors) {
        return null;
    }
    const fieldErrors = formErrors[fieldName];

    console.log('Field errors', fieldErrors);

    if (!fieldErrors) {
        return null;
    }

    return fieldErrors.map(mapError);
};

export const getNonFieldErrors = (errors: any) => {

    if (!errors) {
        return [];
    }

    const formErrors = errors.form;

    if (!formErrors) {
        return [];
    }

    return (formErrors['non_field_errors'] ?? []).map(mapError);
};

export const renderNonFieldErrors = (error: QueryResponseErrorData, t: TFunction<'translation'>, excludeList?: string[]) => {
    return <VStack spacing={'5px'} align={'stretch'}>
        {
            getNonFieldErrors(error)
                .filter((err) => {
                    if (!excludeList) {
                        return true;
                    }
                    return !excludeList.includes(err);
                })
                .map((error, idx) => <ErrorText key={idx}>{t(error)}</ErrorText>)
        }
    </VStack>;
};