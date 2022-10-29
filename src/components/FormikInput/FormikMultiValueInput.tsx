import React, {useMemo} from 'react';

import {VStack} from '@chakra-ui/react';
import {ErrorText} from 'components/chakra/ErrorText/ErrorText';
import {MultiUserSelect} from 'components/Select/MultiUserSelect/MultiUserSelect';
import {FormikFormProps} from 'formik';
import {useTranslation} from 'react-i18next';

interface FormikMultiValueInputProps {
    field: any,
    id: string,
    label: string,
    type: string,
    autoComplete: string | undefined,
    disabled: boolean,
    errors: string[],
    form: FormikFormProps
}

export const FormikMultiValueInput = (props: FormikMultiValueInputProps) => {

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
        <MultiUserSelect />
        {renderErrors}
        {renderFormikErrors}
    </VStack>;
};
