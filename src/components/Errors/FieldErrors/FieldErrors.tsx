import React, { useMemo} from "react";

import {FieldError} from "components/Errors/FieldError/FieldError";
import {useTranslation} from "react-i18next";
import {getFieldError} from "tools/errors/errors";

import { FieldErrorsProps } from "./FieldErrors.types";
import {StyledFieldErrors} from "./style";

export const FieldErrors = (props: FieldErrorsProps) => {

    const {fieldId, responseErrors} = props;

    const {t} = useTranslation();

    const renderErrors = useMemo(() => {

        const fieldErrors = getFieldError(responseErrors, fieldId);

        if (!fieldErrors) {
            return;
        }
        if (fieldErrors.length === 0) {
            return;
        }

        let rows = [];
        for (let i = 0; i < fieldErrors.length; i++) {
            rows.push(<FieldError key={i} error={t(fieldErrors[i])}/>);
        }
        return <>{rows}</>;
    }, [responseErrors, fieldId]);

    return <StyledFieldErrors>
        {renderErrors}
    </StyledFieldErrors>;
};