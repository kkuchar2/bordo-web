import { useCallback, useEffect, useMemo, useState } from 'react';

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
import { getFieldValidationError, getNonFieldErrors } from '@/components/Forms/util';

const Form = <TFieldValues extends FieldValues = FieldValues>(props: FormProps<TFieldValues>) => {
    const {
        initialValues,
        onSubmit,
        onCancel,
        config,
        validationResponse,
        disabled,
        title,
        excludeErrors,
        description,
        submitButtonTextKey,
        submitButtonClassName,
        useCancelButton,
        className
    } = props;

    const { t } = useTranslation();

    const resolver = useYupValidationResolver<TFieldValues>(config.validationSchema);

    const [internalValidationResponse, setInternalValidationResponse] = useState(validationResponse);

    const {
        control,
        handleSubmit,
        watch,
        formState: {
            errors: formErrors,
        },
    } = useForm<TFieldValues>({
        resolver: undefined,
        criteriaMode: 'all',
    });

    useEffect(() => {
        console.log('render form');
    }, []);

    const onFormSubmitted = useCallback((values: TFieldValues) => {
        onSubmit?.(values);
    }, [onSubmit]);

    useEffect(() => {
        console.log('Maybe setting new validation response, disabled:', disabled);
        if (!disabled) {
            console.log('Setting new validation response');
            setInternalValidationResponse(validationResponse);
        }
    }, [validationResponse, disabled]);

    // useEffect(() => {
    //     const subscription = watch(() => {
    //         // Remove additional errors when field value changes
    //         setInternalValidationResponse(undefined);
    //     });
    //     return () => subscription.unsubscribe();
    // }, [watch]);

    const renderFields = useMemo(() => {
        if (!config || !config.fields) {
            return null;
        }

        if (Object.keys(config.fields).length === 0) {
            return null;
        }

        return <div className={'flex flex-col items-stretch gap-[20px]'}>
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
                                additionalFieldErrors={getFieldValidationError(internalValidationResponse, name)}
                            />;
                        }}
                    />;
                })
            }
        </div>;
    }, [config, formErrors, disabled, initialValues, internalValidationResponse]);

    if (!config) {
        console.error('No config');
        return null;
    }

    console.log('internalValidationResponse', internalValidationResponse);

    return <form onSubmit={handleSubmit(onFormSubmitted)}>
        <div className={[className, 'flex flex-col gap-[20px]'].join(' ')}>
            {title && <div className={'text-2xl font-semibold tracking-tight'}>{title}</div>}
            {description}
            {renderFields}
            {getNonFieldErrors(internalValidationResponse)
                .filter((msg => msg != null && !excludeErrors?.includes(msg)))
                .map((msg: string | null, idx: number) => {
                    return msg && <div className={'translate-y-[-20px] animate-fieldError text-[#ff4949]'} key={idx}>
                        {t(msg)}
                    </div>;
                })}
            <div className={'flex'}>
                {useCancelButton && <button
                    type={'button'}
                    className={'cancelButton min-w-[100px]'}
                    onClick={onCancel}
                    disabled={disabled}>
                    {t('CANCEL')}
                </button>}
                <button
                    className={'w-full rounded-md bg-[#006C52] p-3 font-semibold hover:bg-[#00785a] '
                        + submitButtonClassName}
                    type={'submit'}
                    disabled={disabled}>
                    {t(submitButtonTextKey || 'SUBMIT')}
                </button>
            </div>
        </div>
    </form>;
};

export default Form;