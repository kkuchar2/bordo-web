import { useCallback, useMemo } from 'react';

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
        submitButtonTextKey,
        submitButtonClassName,
        useCancelButton,
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
                                errors={formErrors}
                            />;
                        }}
                    />;
                })
            }
        </div>;
    }, [config, formErrors, disabled, initialValues]);

    if (!config) {
        console.error('No config');
        return null;
    }

    return <form onSubmit={handleSubmit(onFormSubmitted)}>
        <div className={[className, 'flex flex-col gap-[20px]'].join(' ')}>
            {title ? <div className={'text-2xl font-semibold'}>{title}</div> : null}
            {description ? <div>{description}</div> : null}
            {renderFields}
            {/*{error && nonFieldErrors}*/}
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