import { Path } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { object, ObjectSchema } from 'yup';

import {
    ChangeEmailFormArgs,
    UpdatePasswordFormArgs,
    ChangeUsernameFormArgs,
    DeleteAccountFormArgs,
    EmptyFormArgs,
    ForgotPasswordFormArgs,
    LoginFormArgs,
    RegistrationFormArgs,
    ResetPasswordFormArgs, UpdatePasswordFormSmallArgs
} from '@/components/Forms/formConfig.types';
import { HookFormInput, HookFormInputProps } from '@/components/HookFormInput/HookFormInput';
import {
    ConfirmPasswordSchema,
    EmailSchema,
    NewPasswordSchema,
    RequiredCurrentPasswordSchema,
    RequiredStringSchema,
    UsernameOrEmailSchema,
    UsernameSchema
} from '@/schema/field_schema';

export type FieldProps<TFieldValues extends FieldValues> = {
    id: string;
    name: Path<TFieldValues>;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string | undefined;
    component: (props: HookFormInputProps<TFieldValues>) => React.JSX.Element;
}

export type FormConfig<TFieldValues extends FieldValues = FieldValues> = {
    fields: FieldProps<TFieldValues>[],
    validationSchema: ObjectSchema<TFieldValues>;
}

export const loginForm: FormConfig<LoginFormArgs> = {
    fields: [
        {
            id: 'username_or_email',
            name: 'username_or_email',
            type: 'text',
            label: 'USERNAME_OR_EMAIL',
            placeholder: 'ENTER_USERNAME_OR_EMAIL_INPUT_PLACEHOLDER',
            required: true,
            autoComplete: 'on',
            component: HookFormInput<LoginFormArgs>
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            label: 'PASSWORD',
            placeholder: 'ENTER_PASSWORD',
            required: true,
            autoComplete: 'current-password',
            component: HookFormInput<LoginFormArgs>
        },
    ],
    validationSchema: object({
        username_or_email: UsernameOrEmailSchema,
        password: RequiredStringSchema,
    })
};

export const registrationForm: FormConfig<RegistrationFormArgs> = {
    fields: [
        {
            id: 'email',
            name: 'email',
            type: 'email',
            label: 'EMAIL',
            placeholder: 'ENTER_EMAIL_INPUT_PLACEHOLDER',
            required: true,
            autoComplete: 'email',
            component: HookFormInput<RegistrationFormArgs>
        },
        {
            id: 'username',
            name: 'username',
            type: 'text',
            label: 'USERNAME',
            placeholder: 'ENTER_USERNAME_INPUT_PLACEHOLDER',
            required: true,
            autoComplete: 'on',
            component: HookFormInput<RegistrationFormArgs>
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            label: 'PASSWORD',
            placeholder: 'ENTER_PASSWORD',
            required: true,
            autoComplete: 'current-password',
            component: HookFormInput<RegistrationFormArgs>
        }
    ],
    validationSchema: object({
        email: EmailSchema,
        username: UsernameSchema,
        password: NewPasswordSchema,
    })
};

export const forgotPasswordForm: FormConfig<ForgotPasswordFormArgs> = {
    fields: [
        {
            id: 'email',
            name: 'email',
            type: 'email',
            label: 'EMAIL',
            placeholder: 'ENTER_EMAIL_INPUT_PLACEHOLDER',
            required: true,
            autoComplete: 'email',
            component: HookFormInput<ForgotPasswordFormArgs>
        }
    ],
    validationSchema: object({
        email: EmailSchema,
    })
};

export const changeEmailForm: FormConfig<ChangeEmailFormArgs> = {
    fields: [
        {
            id: 'new_email',
            name: 'new_email',
            type: 'email',
            label: 'NEW_EMAIL_ADDRESS',
            placeholder: 'NEW_EMAIL_ADDRESS_ENTER',
            required: true,
            autoComplete: 'on',
            component: HookFormInput<ChangeEmailFormArgs>
        },
        {
            id: 'current_password',
            name: 'current_password',
            type: 'password',
            label: 'CURRENT_PASSWORD',
            placeholder: 'CURRENT_PASSWORD_ENTER',
            required: true,
            autoComplete: 'current-password',
            component: HookFormInput<ChangeEmailFormArgs>
        },
    ],
    validationSchema: object({
        new_email: EmailSchema,
        current_password: RequiredCurrentPasswordSchema
    })
};

export const changeUsernameForm: FormConfig<ChangeUsernameFormArgs> = {
    fields: [
        {
            id: 'new_username',
            name: 'new_username',
            type: 'text',
            label: 'NEW_USERNAME',
            placeholder: 'ENTER_NEW_USERNAME_INPUT_PLACEHOLDER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<ChangeUsernameFormArgs>
        },
        {
            id: 'current_password',
            name: 'current_password',
            type: 'password',
            label: 'CURRENT_PASSWORD',
            placeholder: 'CURRENT_PASSWORD_ENTER',
            required: true,
            autoComplete: 'current-password',
            component: HookFormInput<ChangeUsernameFormArgs>
        },
    ],
    validationSchema: object({
        new_username: UsernameSchema,
        current_password: RequiredCurrentPasswordSchema
    })
};

export const resetPasswordForm: FormConfig<ResetPasswordFormArgs> = {
    fields: [
        {
            id: 'new_password',
            name: 'new_password',
            type: 'password',
            label: 'NEW_PASSWORD',
            placeholder: 'NEW_PASSWORD_ENTER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<ResetPasswordFormArgs>
        },
        {
            id: 'new_password_confirm',
            name: 'new_password_confirm',
            type: 'password',
            label: 'NEW_PASSWORD_CONFIRM',
            placeholder: 'INPUT_PASSWORD_CONFIRM_PLACEHOLDER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<ResetPasswordFormArgs>
        },
    ],
    validationSchema: object({
        new_password: NewPasswordSchema,
        new_password_confirm: ConfirmPasswordSchema('new_password')
    })
};

export const updatePasswordForm: FormConfig<UpdatePasswordFormArgs> = {
    fields: [
        {
            id: 'current_password',
            name: 'current_password',
            type: 'password',
            label: 'CURRENT_PASSWORD',
            placeholder: 'CURRENT_PASSWORD_ENTER',
            required: true,
            autoComplete: 'current-password',
            component: HookFormInput<UpdatePasswordFormArgs>
        },
        {
            id: 'new_password',
            name: 'new_password',
            type: 'password',
            label: 'NEW_PASSWORD',
            placeholder: 'NEW_PASSWORD_ENTER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<UpdatePasswordFormArgs>
        },
        {
            id: 'new_password_confirm',
            name: 'new_password_confirm',
            type: 'password',
            label: 'NEW_PASSWORD_CONFIRM',
            placeholder: 'INPUT_PASSWORD_CONFIRM_PLACEHOLDER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<UpdatePasswordFormArgs>
        },
    ],
    validationSchema: object({
        current_password: RequiredCurrentPasswordSchema,
        new_password: NewPasswordSchema,
        new_password_confirm: ConfirmPasswordSchema('new_password')
    })
};

export const updatePasswordFormSmall: FormConfig<UpdatePasswordFormSmallArgs> = {
    fields: [
        {
            id: 'new_password',
            name: 'new_password',
            type: 'password',
            label: 'NEW_PASSWORD',
            placeholder: 'NEW_PASSWORD_ENTER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<UpdatePasswordFormSmallArgs>
        },
        {
            id: 'new_password_confirm',
            name: 'new_password_confirm',
            type: 'password',
            label: 'NEW_PASSWORD_CONFIRM',
            placeholder: 'INPUT_PASSWORD_CONFIRM_PLACEHOLDER',
            required: true,
            autoComplete: 'off',
            component: HookFormInput<UpdatePasswordFormSmallArgs>
        },
    ],
    validationSchema: object({
        new_password: NewPasswordSchema,
        new_password_confirm: ConfirmPasswordSchema('new_password')
    })
};

export const deleteAccountForm: FormConfig<DeleteAccountFormArgs> = {
    fields: [
        {
            id: 'current_password',
            name: 'current_password',
            type: 'password',
            label: 'CURRENT_PASSWORD',
            placeholder: 'CURRENT_PASSWORD_ENTER',
            required: true,
            autoComplete: 'current-password',
            component: HookFormInput<DeleteAccountFormArgs>
        },
    ],
    validationSchema: object({
        current_password: RequiredCurrentPasswordSchema,
    })
};

export const emptyForm: FormConfig<EmptyFormArgs> = {
    fields: [],
    validationSchema: object({})
};
