import React from "react";

import { getResponseError } from "tools/errors/errors";

import { FormError } from "../FormError/FormError";

export interface FormErrorsProps {
    errors: any, // TODO
    translation: any // TODO
}

export const FormErrors = (props: FormErrorsProps) => {

    const {errors, translation} = props;

    let requestError = errors.requestError;
    let responseError = errors.responseError;

    let rows = [];

    if (responseError && responseError.detail) {
        const formErrors = responseError.detail.form;

        let nonFieldFormErrors = getResponseError(formErrors, 'non_field_errors');

        for (let i = 0; i < nonFieldFormErrors.length; i++) {
            rows.push(<FormError key={i} error={translation(nonFieldFormErrors[i]['message'])}/>);
        }
    }

    if (requestError && requestError.detail) {
        rows.push(<FormError key={rows.length + 1} error={translation(requestError.detail)}/>);
    }

    return <>{rows}</>;
};