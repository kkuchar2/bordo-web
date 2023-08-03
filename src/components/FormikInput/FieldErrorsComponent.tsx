import React from 'react';

import { TFunction } from 'i18next';
import { MultipleFieldErrors } from 'react-hook-form';

type FieldErrorsProps = {
    message: string;
    messages?: MultipleFieldErrors | undefined
    t: TFunction<'translation', undefined>
}

export const FieldErrorsComponent = (props: FieldErrorsProps) => {

    const { message, messages, t } = props;

    if (!messages && !message) {
        return null;
    }

    if (message) {
        return <div className={'translate-y-[-20px] animate-fieldError text-[#ff4949]'} key={Math.random()}>
            {t(message)}
        </div>;
    }

    if (!messages) {
        return null;
    }

    return Object.entries(messages).map(([type, msg]) => (
        <div className={'translate-y-[-20px] animate-fieldError text-[#ff4949]'} key={type}>
            {t(msg as string)}
        </div>
    ));
};