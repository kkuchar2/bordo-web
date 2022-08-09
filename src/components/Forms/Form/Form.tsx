import React, {useCallback, useMemo} from 'react';

import {Button, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {getFormFieldErrors} from 'components/Forms/util';
import {InputWithError} from 'components/InputWithError/InputWithError';
import {Field, Form as FormikForm, Formik} from 'formik';
import {useTranslation} from 'react-i18next';

import {FormProps} from './Form.types';

const Form = (props: FormProps) => {

    const { t } = useTranslation();

    const {
        initialValues,
        onSubmit, onCancel, config, disabled,
        errors, title, description, submitButtonText,
        useCancelButton
    } = props;

    const onFormSubmitted = useCallback((values): any => {
        onSubmit?.(values);
    }, [onSubmit]);

    const renderFields = useCallback((disabled) => {
        if (!config || !config.fields) {
            return null;
        }
        return Object.keys(config.fields).map((fieldId, idx) => {
            const fieldCfg = config.fields[fieldId];

            return <Field
                key={idx}
                id={fieldId}
                disabled={disabled}
                errors={getFormFieldErrors(errors, fieldCfg.id)}
                component={InputWithError}
                {...fieldCfg}/>;
        });
    }, [config, errors, disabled, initialValues]);

    const renderCancelButton = useMemo(() => {
        if (!useCancelButton) {
            return null;
        }

        return <Button type={'button'}
                       minWidth={'100px'}
                       className={'cancelButton'}
                       onClick={onCancel}
                       isDisabled={disabled}>
            {t('CANCEL')}
        </Button>;
    }, [useCancelButton, disabled]);

    const getInitialValues = useCallback((): any => {

        const values = {};

        if (!config || !config.fields) {
            return null;
        }

        Object.keys(config.fields).map((fieldId,) => {
            const fieldCfg = config.fields[fieldId];
            const fieldID = fieldCfg.id;

            if (initialValues && initialValues[fieldID]) {
                values[fieldID] = initialValues[fieldID];
            }
            else {
                values[fieldID] = '';
            }
        });

        return values;
    }, [initialValues, config]);

    return <Formik
        initialValues={getInitialValues()}
        validationSchema={config.validationSchema ? config.validationSchema : null}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={onFormSubmitted}>
        {() => (
            <FormikForm>
                <VStack spacing={'10px'} align={'stretch'}>
                    <Heading fontSize={'2xl'}>{title}</Heading>
                    <Text>{description}</Text>
                    <VStack spacing={'20px'} align={'stretch'}>
                        {renderFields(disabled)}
                    </VStack>
                    <HStack paddingTop={10}>
                        {renderCancelButton}
                        <Button bg={'teal.600'} _hover={{
                            bg: 'teal.500'
                        }} type={'submit'} width={'100%'} isDisabled={disabled}>
                            {t(submitButtonText)}
                        </Button>
                    </HStack>
                </VStack>
            </FormikForm>
        )}
    </Formik>;
};

Form.defaultProps = {
    useCancelButton: true,
    submitButtonText: 'Confirm',
    initialValues: {},
};

export default Form;