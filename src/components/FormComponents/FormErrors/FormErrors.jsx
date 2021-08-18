import {FormError} from "components/FormComponents/FormErrors/FormError.jsx";
import _ from 'lodash';
import React from "react";
import {getResponseError} from "util/api_util.js";

export const FormErrors = (props) => {

    const {errors, translation} = props;

    /**
     * Get generic application errors
     */
    let genericErrors = getResponseError(errors, 'generic');

    /**
     * Get non-field errors for form
     */
    let formError = getResponseError(errors, 'form', 'non_field_errors');

    /**
     * Filter generic errors by source - not displaying autologin errors
     */
    genericErrors = _.filter(genericErrors, error => error.source !== 'autoLogin');

    /**
     * Merge generic application errors with non-field form errors
     */
    const targetErrors = [...genericErrors, ...formError];

    /**
     * Render each error in row
     */
    let rows = [];
    for (let i = 0; i < targetErrors.length; i++) {
        rows.push(<FormError key={i} error={translation(targetErrors[i]['message'])}/>);
    }
    return <>{rows}</>;
};