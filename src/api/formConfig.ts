import {useMemo} from "react";

import {TFunction} from "react-i18next";
import {object, SchemaOf} from "yup";

import {
    ConfirmPasswordSchema,
    EmailSchema,
    NewPasswordSchema, RequiredCurrentPasswordSchema,
    RequiredStringSchema,
    UsernameSchema
} from "../schema/field_schema";

import {fieldTypes} from "./fieldTypes";
import {
    ChangeEmailFormArgs,
    ChangeUsernameFormArgs, CreateNewPasswordFormArgs, DeleteAccountFormArgs,
    ForgotPasswordFormArgs,
    LoginFormArgs, ResetPasswordFormArgs,
    SignupFormArgs
} from "./formConfig.types";

export interface FieldConfig {
    name: string;
}

export interface FormConfig<T = any> {
    fields?: FieldConfig[];
    validationSchema?: SchemaOf<T>
}

export interface FormConfigs {
    login: FormConfig<LoginFormArgs>,
    registration: FormConfig<SignupFormArgs>,
    forgotPassword: FormConfig<ForgotPasswordFormArgs>,
    createNewPassword: FormConfig<CreateNewPasswordFormArgs>,
    changeEmail: FormConfig<ChangeEmailFormArgs>,
    changeUsername: FormConfig<ChangeUsernameFormArgs>,
    resetPassword: FormConfig<ResetPasswordFormArgs>,
    deleteAccount: FormConfig<DeleteAccountFormArgs>,
    emptyForm: FormConfig,
}

export const FORM_CONFIG: FormConfigs = {
    login: {
        fields: [
            { name: 'email' },
            { name: 'password' },
        ],
        validationSchema: object({
            email: EmailSchema,
            password: RequiredStringSchema,
        })
    },
    registration: {
        fields: [
            { name: 'email' },
            { name: 'password' },
        ],
        validationSchema: object({
            email: EmailSchema,
            password: NewPasswordSchema,
        })
    },
    forgotPassword: {
        fields: [
            { name: 'email' },
        ],
        validationSchema: object({
            email: EmailSchema,
        })
    },
    createNewPassword: {
        fields: [
            { name: 'new_password' },
            { name: 'new_password_confirm' },
        ],
        validationSchema: object({
            new_password: NewPasswordSchema,
            new_password_confirm: ConfirmPasswordSchema('new_password'),
        })
    },
    changeEmail: {
        fields: [
            { name: 'new_email' },
            { name: 'current_password' },
        ]
    },
    changeUsername: {
        fields: [
            { name: 'username' },
            { name: 'current_password' },
        ],
        validationSchema: object({
            username: UsernameSchema,
            current_password: RequiredCurrentPasswordSchema
        })
    },
    resetPassword: {
        fields: [
            { name: 'current_password' },
            { name: 'new_password' },
            { name: 'new_password_confirm' },
        ],
        validationSchema: object({
            current_password: RequiredCurrentPasswordSchema,
            new_password: NewPasswordSchema,
            new_password_confirm: ConfirmPasswordSchema('new_password'),
        })
    },
    deleteAccount: {
        fields: [
            { name: 'current_password' },
        ],
        validationSchema: object({
            current_password: RequiredCurrentPasswordSchema
        })
    },
    emptyForm: {
        fields: [],
        validationSchema: object({})
    },
};

export const getField = (fieldName: string,  translation: TFunction<"translation">): FieldConfig => {

    if (!fieldTypes[fieldName]) {
        console.error(`Field type ${fieldName} not found`);
        return null;
    }

    return fieldTypes[fieldName](translation);
};

export const getConfig  = (configs : FormConfigs, configName, t) : FormConfig => {

    const config : FormConfig = configs[configName];

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
    return useMemo(() => getConfig(FORM_CONFIG, configName, translation), [translation]);
};