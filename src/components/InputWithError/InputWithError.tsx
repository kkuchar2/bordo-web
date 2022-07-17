import React, {useMemo} from "react";

import {shakeAnimation} from "components/Forms/animation";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";

export const InputWithError = ({ field, id, label, type, autoComplete, placeholder, disabled, errors, form }) => {

    const { t } = useTranslation();

    const { errors: formErrors } = form;

    const renderErrors = useMemo(() => {
        if (!errors) {
            return null;
        }
        return <motion.div className={'error mt-3'} {...shakeAnimation}>{errors.map((el,) => t(el))}</motion.div>;
    }, [errors, id]);

    const renderFormError = useMemo(() => {
        const formError = formErrors[id];

        if (formError) {
            return <motion.div className={'error mt-3'} {...shakeAnimation}>{formError}</motion.div>;
        }
    }, [formErrors, id]);

    const outlineClass = useMemo(() => {
        if (!errors && formErrors) {
            return null;
        }

        return 'outline outline-1 outline-offset-1 outline-red-500';
    }, [errors, formErrors, id]);

    return <div className={'flex flex-col mb-[20px]'}>
        {label ? <div
            className={`text-input-title text-[14px] font-semibold mb-2`}>{`${label?.toUpperCase()}:`}</div> : null}
        <input
            className={`input ${outlineClass} text-pink-500`}
            type={type}
            autoComplete={autoComplete}
            disabled={disabled}
            placeholder={placeholder}
            {...field}  />
        {renderErrors}
        {renderFormError}
    </div>;
};