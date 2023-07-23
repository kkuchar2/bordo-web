import React, { useCallback, useMemo } from 'react';

import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import {
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    Path,
    useForm,
    UseFormStateReturn
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormProps } from './Form.types';

import useYupValidationResolver from '@/components/Forms/Form/useYupValidationResolver';

const Form = <TFieldValues extends FieldValues = FieldValues>(props: FormProps<TFieldValues>) => {
    const {
        initialValues,
        onSubmit,
        onCancel,
        config,
        disabled,
        title,
        excludeErrors,
        description,
        fieldsSpacing = '20px',
        contentSpacing = '20px',
        submitButtonTextKey,
        useCancelButton,
        buttonsStackProps,
        buttonProps,
        className
    } = props;

    const { t } = useTranslation();

    const resolver = useYupValidationResolver<TFieldValues>(config.validationSchema);

    const {
        control,
        handleSubmit,
        setError,
        formState: {
            errors: formErrors,
        },
    } = useForm<TFieldValues>({
        resolver: resolver,
        criteriaMode: 'all',
    });

    const onFormSubmitted = useCallback((values: TFieldValues) => {
        onSubmit?.(values);
    }, [onSubmit]);

    const renderFields = useMemo(() => {
        if (!config || !config.fields) {
            return null;
        }

        if (Object.keys(config.fields).length === 0) {
            return null;
        }

        return <VStack spacing={fieldsSpacing} align={'stretch'}>
            {
                config.fields.map(f => {

                    const { id, name, component: FieldComponent } = f;

                    return <Controller
                        key={id}
                        control={control}
                        name={name}
                        render={({ field, fieldState, formState }: {
                            field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
                            fieldState: ControllerFieldState;
                            formState: UseFormStateReturn<TFieldValues>;
                        }) => {
                            return <FieldComponent
                                {...f}
                                field={field}
                                fieldState={fieldState}
                                formState={formState}
                                errors={formErrors}
                            />;
                        }}
                    />;
                })
            }
        </VStack>;
    }, [config, formErrors, disabled, initialValues]);

    if (!config) {
        console.error('No config');
        return null;
    }

    return <form onSubmit={handleSubmit(onFormSubmitted)}>
        <Flex className={className} direction={'column'} gap={contentSpacing}>
            {title ? <Text fontSize={'2xl'} fontWeight={'semibold'}>{title}</Text> : null}
            {description ? <Text>{description}</Text> : null}
            {renderFields}
            {/*{error && nonFieldErrors}*/}
            <Flex {...buttonsStackProps}>
                {useCancelButton && <Button type={'button'}
                    minWidth={'100px'}
                    className={'cancelButton'}
                    onClick={onCancel}
                    isDisabled={disabled}>
                    <Text fontSize={'sm'}>{t('CANCEL')}</Text>
                </Button>}
                <Button bg={'#006C52'}
                    _hover={{ bg: '#00785a' }}
                    type={'submit'}
                    width={'100%'}
                    isDisabled={disabled}
                    {...buttonProps}>
                    <Text fontSize={'sm'}>
                        {t(submitButtonTextKey || 'SUBMIT')}
                    </Text>
                </Button>
            </Flex>
        </Flex>
    </form>;
};

export default Form;