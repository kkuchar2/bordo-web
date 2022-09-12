import React, {useMemo} from 'react';

import {VStack} from '@chakra-ui/react';
import {ErrorText} from 'components/chakra/ErrorText/ErrorText';
import {InputSmartLabel} from 'components/InputSmartLabel/InputSmartLabel';
import {FormikFormProps} from 'formik';
import {useTranslation} from 'react-i18next';

interface FormikInputProps {
    field: any,
    id: string,
    label: string,
    type: string,
    autoComplete: string | undefined,
    disabled: boolean,
    errors: string[],
    form: FormikFormProps
}

export const FormikInput = (props: FormikInputProps) => {

    const {
        field,
        id,
        label,
        type,
        autoComplete,
        disabled,
        errors,
        form,
        ...rest
    } = props;

    const { t } = useTranslation();

    const { errors: formikErrors } = form;

    const renderErrors = useMemo(() => {
        if (!errors) {
            return null;
        }
        return <ErrorText>{errors.map((el,) => t(el))}</ErrorText>;
    }, [errors, id]);

    const renderFormikErrors = useMemo(() => {
        const formError = formikErrors[id];

        if (formError) {
            return <ErrorText>{formError}</ErrorText>;
        }
    }, [formikErrors, id]);

    return <VStack spacing={'7px'} align={'stretch'} position={'relative'}>
        <InputSmartLabel
            label={label}
            bg={field.bg}
            type={type}
            autoComplete={autoComplete}
            disabled={disabled}
            isValid={!errors?.includes(id) && !formikErrors[id]}
            {...field}
            {...rest} />
        {renderErrors}
        {renderFormikErrors}
    </VStack>;
};