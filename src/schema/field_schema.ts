import {ref, string} from "yup";

export const NewPasswordSchema = string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[^a-zA-Z\d]/, 'Password must contain at least one special character');

export const ConfirmPasswordSchema = (reference: string) => string()
    .required('Password confirmation is required')
    .oneOf([ref(reference), null], 'Passwords do not match');

export const RequiredStringSchema = (t: any) => string()
    .required(t('FIELD_REQUIRED'));

export const RequiredCurrentPasswordSchema = (t: any) => string()
    .required(t('CURRENT_PASSWORD_REQUIRED'));

export const EmailSchema = string()
    .email('Please enter valid E-mail address')
    .required('This field may not be blank');

export const UsernameSchema = string()
    .min(5, 'Username must be at least 5 characters long')
    .required('This field may not be blank');