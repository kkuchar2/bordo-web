import React, {useCallback, useMemo} from 'react';

import {Button, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import {FormikInput} from 'components/FormikInput/FormikInput';
import {getFormFieldErrors, renderNonFieldErrors} from 'components/Forms/util';
import {Field, Form as FormikForm, Formik} from 'formik';
import {useTranslation} from 'react-i18next';

import {FormProps} from './Form.types';

const Form = (props: FormProps) => {
    const {
        initialValues,
        onSubmit,
        onCancel,
        config,
        disabled,
        error,
        title,
        excludeErrors,
        description,
        fieldsSpacing = '20px',
        contentSpacing = '20px',
        submitButtonText,
        useCancelButton,
        buttonsStackProps,
        fieldBg
    } = props;

    const { t } = useTranslation();

    const onFormSubmitted = useCallback((values): any => {
        onSubmit?.(values);
    }, [onSubmit]);

    const renderFields = useMemo(() => {
        if (!config || !config.fields) {
            return null;
        }

        return Object.keys(config.fields).map((fieldId, idx) => {
            const fieldCfg = config.fields[fieldId];

            return <Field
                key={idx}
                id={fieldId}
                disabled={disabled}
                errors={getFormFieldErrors(error, fieldCfg.id)}
                component={FormikInput}
                bg={fieldBg}
                {...fieldCfg}/>;
        });
    }, [config, error, disabled, initialValues]);

    const renderCancelButton = useMemo(() => {
        if (!useCancelButton) {
            return null;
        }

        return <Button type={'button'}
                       minWidth={'100px'}
                       borderRadius={0}
                       className={'cancelButton'}
                       onClick={onCancel}
                       isDisabled={disabled}>
            <Text fontSize={'12px'}>{t('CANCEL')}</Text>
        </Button>;
    }, [useCancelButton, disabled]);

    const computedInitialValues = useMemo(() => {

        const values = {};

        if (!config || !config.fields) {
            return null;
        }

        Object.keys(config.fields).map((fieldId,) => {
            const fieldCfg = config.fields[fieldId];
            const fieldName = fieldCfg.name;

            if (initialValues && initialValues[fieldName]) {
                values[fieldName] = initialValues[fieldName];
            }
            else {
                values[fieldName] = '';
            }
        });

        return values;
    }, [initialValues, config]);

    const nonFieldErrors = useMemo(() => {
        return renderNonFieldErrors(error, excludeErrors, t);
    }, [error, t]);

    return <Formik
        initialValues={computedInitialValues}
        validationSchema={config.validationSchema ? config.validationSchema : null}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={onFormSubmitted}>
        {() => (
            <FormikForm>
                <Flex direction={'column'} gap={contentSpacing} align={'stretch'}>
                    {title ? <Text fontSize={'2xl'} fontWeight={'semibold'}>{title}</Text> : null}
                    {description ? <Text>{description}</Text> : null}
                    <VStack spacing={fieldsSpacing} align={'stretch'}>
                        {renderFields}
                    </VStack>
                    {nonFieldErrors}
                    <HStack {...buttonsStackProps}>
                        {renderCancelButton}
                        <Button bg={'#5568FE'}
                                borderRadius={0}
                                _hover={{ bg: '#5f70fb' }}
                                type={'submit'}
                                width={'100%'}
                                isDisabled={disabled}>
                            <Text fontSize={'12px'}>{submitButtonText}</Text>
                        </Button>
                    </HStack>
                </Flex>
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