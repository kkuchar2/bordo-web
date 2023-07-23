import { ref, string } from 'yup';

export const NewPasswordSchema = string()
    .required('FIELD_REQUIRED')
    .min(8, 'PASSWORD_TOO_SHORT')
    .matches(/[^a-zA-Z\d]/, 'PASSWORD_SPECIAL_CHARACTERS');

export const ConfirmPasswordSchema = (reference: string) => string()
    .required('Password confirmation is required')
    .oneOf([ref(reference), null], 'Passwords do not match');

export const RequiredStringSchema = string()
    .required('FIELD_REQUIRED');

export const RequiredArraySchema = string()
    .required('FIELD_REQUIRED')
    .min(1, 'FIELD_REQUIRED');

export const RequiredCurrentPasswordSchema = string()
    .required('CURRENT_PASSWORD_REQUIRED');

export const EmailSchema = string()
    .email('Please enter valid E-mail address')
    .required('FIELD_REQUIRED');

export const UsernameSchema = string()
    .min(5, 'Username must be at least 5 characters long')
    .max(50, 'Username must be at most 50 characters long')
    .required('FIELD_REQUIRED');

export const UsernameOrEmailSchema = string()
    .required('FIELD_REQUIRED');