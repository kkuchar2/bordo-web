import React, {useCallback, useMemo} from 'react';

import {getFormFieldErrors} from "components/Forms/util";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Field, Form as FormikForm, Formik} from "formik";
import {useTranslation} from "react-i18next";

import {FormProps} from "./Form.types";

const Form = (props: FormProps) => {

    const { t } = useTranslation();

    const {
        initialValues,
        onSubmit, onCancel, config, disabled,
        errors, title, description, customDescription, submitButtonText,
        useCancelButton, confirmButtonClassName,
        className, buttonsClasses
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
        return useCancelButton ? <button type={'button'} className={'cancelButton'} onClick={onCancel}
                                         disabled={false}>{t('CANCEL')}</button> : null;
    }, [useCancelButton]);

    // render description
    const renderDescription = useMemo(() => {
        if (customDescription) {
            return customDescription;
        }
        return description ? <h1 className={'form-description'}>{description}</h1> : null;
    }, [description, customDescription]);

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
            <FormikForm className={className}>
                {title ? <h1 className={'form-title'}>{title}</h1> : null}
                {renderDescription}
                {renderFields(disabled)}
                <div className={buttonsClasses}>
                    {renderCancelButton}
                    <button type={'submit'} className={confirmButtonClassName} disabled={disabled}>
                        {t(submitButtonText)}
                    </button>
                </div>
            </FormikForm>
        )}
    </Formik>;
};

Form.defaultProps = {
    useCancelButton: true,
    buttonsClasses: 'pt-[20px]',
    confirmButtonClassName: 'confirmButton',
    submitButtonText: 'Confirm',
    initialValues: {},
};

export default Form;