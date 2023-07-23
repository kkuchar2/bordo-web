import React from 'react';

import { MultipleFieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FieldErrorsProps = {
    message: string;
    messages?: MultipleFieldErrors | undefined
}

/**
 * Component that renders single or multiple field errors.
 */
export const FieldErrorsComponent = (props: FieldErrorsProps) => {

    const { message, messages } = props;

    const { t } = useTranslation();

    if (message) {
        return <div className={'text-[#ff4949]'} key={Math.random()}>
            {t(message)}
        </div>;
    }

    if (!messages) {
        return null;
    }

    return Object.entries(messages).map(([type, msg]) => (
        <div className={'text-[#ff4949]'} key={type}>
            {t(msg as string)}
        </div>
    ));
};