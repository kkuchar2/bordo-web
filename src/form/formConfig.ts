import { useMemo } from 'react';

import { TFunction } from 'i18next';
import { AnyObject, Maybe, object, ObjectSchema } from 'yup';

import { fieldTypes } from './fieldTypes';
import {
    ChangeEmailFormArgs,
    ChangePasswordFormArgs,
    ChangeUsernameFormArgs,
    CreateGroupFormArgs,
    DeleteAccountFormArgs,
    ForgotPasswordFormArgs,
    LoginFormArgs,
    ResetPasswordFormArgs,
    SignupFormArgs
} from './formConfig.types';

import {
    ConfirmPasswordSchema,
    EmailSchema,
    NewPasswordSchema,
    RequiredCurrentPasswordSchema,
    RequiredStringSchema,
    UsernameOrEmailSchema,
    UsernameSchema
} from '@/schema/field_schema';

export interface FieldConfig {
    name: string;
}

export interface FormConfig<T extends Maybe<AnyObject>> {
    fields?: FieldConfig[];
    validationSchema?: ObjectSchema<T>
}

export interface FormConfigs {
    login: FormConfig<LoginFormArgs>,
    registration: FormConfig<SignupFormArgs>,
    forgotPassword: FormConfig<ForgotPasswordFormArgs>,
    changeEmail: FormConfig<ChangeEmailFormArgs>,
    changeUsername: FormConfig<ChangeUsernameFormArgs>,
    resetPassword: FormConfig<ResetPasswordFormArgs>,
    changePassword: FormConfig<ChangePasswordFormArgs>,
    deleteAccount: FormConfig<DeleteAccountFormArgs>,
    createGroup: FormConfig<CreateGroupFormArgs>,
    emptyForm: FormConfig<null>,
}

export const FORM_CONFIG = (t: any): FormConfigs => {
    return {
        login: {
            fields: [
                { name: 'username_or_email' },
                { name: 'password' },
            ],
            validationSchema: object({
                username_or_email: UsernameOrEmailSchema(t),
                password: RequiredStringSchema(t),
            })
        },
        registration: {
            fields: [
                { name: 'email' },
                { name: 'username' },
                { name: 'password' },
            ],
            validationSchema: object({
                email: EmailSchema(t),
                username: UsernameSchema(t),
                password: NewPasswordSchema(t),
            })
        },
        forgotPassword: {
            fields: [
                { name: 'email' },
            ],
            validationSchema: object({
                email: EmailSchema(t),
            })
        },
        changeEmail: {
            fields: [
                { name: 'new_email' },
                { name: 'current_password' },
            ],
            validationSchema: object({
                new_email: EmailSchema(t),
                current_password: RequiredCurrentPasswordSchema(t)
            })
        },
        changeUsername: {
            fields: [
                { name: 'new_username' },
                { name: 'current_password' },
            ],
            validationSchema: object({
                new_username: UsernameSchema(t),
                current_password: RequiredCurrentPasswordSchema(t)
            })
        },
        resetPassword: {
            fields: [
                { name: 'new_password' },
                { name: 'new_password_confirm' },
            ],
            validationSchema: object({
                new_password: NewPasswordSchema(t),
                new_password_confirm: ConfirmPasswordSchema('new_password'),
            })
        },
        changePassword: {
            fields: [
                { name: 'current_password' },
                { name: 'new_password' },
                { name: 'new_password_confirm' },
            ],
            validationSchema: object({
                current_password: RequiredCurrentPasswordSchema(t),
                new_password: NewPasswordSchema(t),
                new_password_confirm: ConfirmPasswordSchema('new_password'),
            })
        },
        deleteAccount: {
            fields: [
                { name: 'current_password' },
            ],
            validationSchema: object({
                current_password: RequiredCurrentPasswordSchema(t)
            })
        },
        createGroup: {
            fields: [
                { name: 'group_name' }
            ],
            validationSchema: object({
                group_name: RequiredStringSchema(t)
            })
        },
        emptyForm: {
            fields: [],
            validationSchema: object({})
        }
    };
};

export const getField = (fieldName: string, translation: TFunction<'translation'>): FieldConfig => {

    if (!fieldTypes[fieldName]) {
        console.error(`Field type ${fieldName} not found`);
        return null;
    }

    return fieldTypes[fieldName](translation);
};

export const getConfig = (configs: FormConfigs, configName, t): FormConfig => {

    const config: FormConfig = configs[configName];

    if (!config) {
        console.error(`Config key ${configName} not found`);
        return null;
    }

    const result = {
        fields: [],
        validationSchema: null
    };

    const fields = config.fields;

    if (!fields) {
        return result;
    }

    fields.forEach(f => result.fields[f.name] = getField(f.name, t));
    result.validationSchema = config.validationSchema;
    return result;
};

export const useFormConfig = (configName: string, translation: any) => {
    return useMemo(() => getConfig(FORM_CONFIG(translation), configName, translation), [translation]);
};
