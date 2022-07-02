import React, {useMemo} from "react";

import {shakeAnimation} from "components/Forms/animation";
import {motion} from "framer-motion";

export const InputWithError = ({ field, id, label, type, autoComplete, placeholder, disabled, form: { errors } }) => {
    const renderError = useMemo(() => {
        const error = errors[id];

        if (error) {
            return <motion.div className={'error mt-3'} {...shakeAnimation}>{error}</motion.div>;
        }
    }, [errors, id]);

    const outlineClass = useMemo(() => {
        const error = errors[id];

        if (error) {
            return 'outline outline-1 outline-offset-1 outline-red-500';
        }
        return '';
    }, [errors, id]);

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
        {renderError}
    </div>;
};