import React, {useCallback, useMemo} from 'react';

import {Button, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import {ErrorText} from 'components/chakra/ErrorText/ErrorText';
import {TextAreaFormProps} from 'components/Forms/TextAreaForm/TextAreaForm.types';
import {getFormFieldErrors, getNonFieldErrors} from 'components/Forms/util';
import {InputWithError} from 'components/InputWithError/InputWithError';
import {Field, Form as FormikForm, Formik} from 'formik';
import { useTranslation } from 'react-i18next';

export const TextAreaForm = (props: TextAreaFormProps) => {
    const {
        initialValues = {},
        onSubmit,
        onCancel,
        config,
        disabled,
        errors,
        title,
        description,
        fieldsSpacing = '20px',
        contentSpacing = '20px',
        submitButtonTextKey = 'CONFIRM',
        useCancelButton = true,
        buttonsStackProps
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
        return <VStack spacing={'5px'} align={'stretch'}>
            {getNonFieldErrors(errors).map((error, idx) => <ErrorText key={idx}>{t(error)}</ErrorText>)}
        </VStack>;
    }, [errors, t]);

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
                    {title ? <Text fontSize={'2xl'}>{title}</Text> : null}
                    {description ? <Text>{description}</Text> : null}
                    <VStack spacing={fieldsSpacing} align={'stretch'}>
                        {renderFields}
                    </VStack>
                    {nonFieldErrors}
                    <HStack {...buttonsStackProps}>
                        {renderCancelButton}
                        <Button bg={'#5568FE'}
                                _hover={{ bg: '#5f70fb' }}
                                type={'submit'}
                                width={'100%'}
                                isDisabled={disabled}>
                            <Text fontSize={'12px'}>{submitButtonTextKey}</Text>
                        </Button>
                    </HStack>
                </Flex>
            </FormikForm>
        )}
    </Formik>;
};
