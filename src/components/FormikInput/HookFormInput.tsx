import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import {
    ControllerFieldState,
    ControllerRenderProps,
    FieldErrors,
    FieldValues,
    Path,
    UseFormStateReturn
} from 'react-hook-form';

import { FieldErrorsComponent } from '@/components/FormikInput/FieldErrorsComponent';
import { FieldProps } from '@/components/Forms/formConfig';
import { InputWithSmartLabel } from '@/components/InputWithSmartLabel/InputWithSmartLabel';

export type HookFormInputProps<TFieldValues extends FieldValues> = FieldProps<TFieldValues> & {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<TFieldValues>
    errors: FieldErrors<TFieldValues>
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
        errors,
    } = props;

    return <VStack spacing={'7px'} align={'stretch'} position={'relative'}>
        <InputWithSmartLabel
            label={label}
            type={type}
            id={id}
            value={field.value}
            name={name}
            onChange={field.onChange}
            autoComplete={autoComplete}
            isValid={true}/>
        {errors && <ErrorMessage
            errors={errors}
            name={id as any}
            render={FieldErrorsComponent}/>
        }
    </VStack>;
};