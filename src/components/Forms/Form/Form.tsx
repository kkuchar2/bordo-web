import React, {useCallback, useMemo} from 'react';

import {Button, Flex, Text, VStack} from '@chakra-ui/react';
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
        fieldBg,
        buttonProps
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
                       className={'cancelButton'}
                       onClick={onCancel}
                       isDisabled={disabled}>
            <Text fontSize={'sm'}>{t('CANCEL')}</Text>
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
        return renderNonFieldErrors(error, t, excludeErrors);
    }, [error, t]);

    console.log(config.validationSchema);

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
                    <Flex {...buttonsStackProps}>
                        {renderCancelButton}
                        <Button bg={'#006C52'}
                                _hover={{ bg: '#00785a' }}
                                type={'submit'}
                                width={'100%'}
                                isDisabled={disabled}
                                {...buttonProps}>
                            <Text fontWeight={'bold'}>{submitButtonText}</Text>
                        </Button>
                    </Flex>
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