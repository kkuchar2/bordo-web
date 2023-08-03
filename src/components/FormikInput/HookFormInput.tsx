import React, { ReactElement } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    Path,
    UseFormStateReturn
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FieldErrorsComponent } from '@/components/FormikInput/FieldErrorsComponent';
import { FieldProps } from '@/components/Forms/formConfig';
import { InputWithSmartLabel } from '@/components/InputWithSmartLabel/InputWithSmartLabel';

export type HookFormInputProps<TFieldValues extends FieldValues> = FieldProps<TFieldValues> & {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<TFieldValues>,
    additionalFieldErrors?: string[]
}

export const HookFormInput = <TFieldValues extends FieldValues>
(props: HookFormInputProps<TFieldValues>): ReactElement => {

    const {
        field,
        id,
        name,
        label,
        type,
        autoComplete,
        formState: { errors },
        additionalFieldErrors
    } = props;

    const { t } = useTranslation();

    return <div className={'flex flex-col gap-3'}>
        <InputWithSmartLabel
            value={field.value}
            type={type}
            label={label}
            id={id}
            name={name}
            autoComplete={autoComplete}
            disabled={false}
            onChange={field.onChange}
            spellCheck={false}
            isValid={true} />

        {errors && <ErrorMessage
            errors={errors}
            name={name as any}
            render={({ message, messages }) => {
                return <FieldErrorsComponent message={message} messages={messages} t={t} />;
            }} />
        }

        {additionalFieldErrors && additionalFieldErrors.map((e, i) => {
            return <div className={'translate-y-[-20px] animate-fieldError text-[#ff4949]'} key={i}>
                {t(e)}
            </div>;
        })}
    </div>;
};