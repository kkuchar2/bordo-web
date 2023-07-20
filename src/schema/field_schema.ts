import { ref, string } from 'yup';

export const NewPasswordSchema = (t: any) => string()
    .required(t('FIELD_REQUIRED'))
    .min(8, t('PASSWORD_TOO_SHORT'))
    .matches(/[^a-zA-Z\d]/, t('PASSWORD_SPECIAL_CHARACTERS'));

export const ConfirmPasswordSchema = (reference: string) => string()
    .required('Password confirmation is required')
    .oneOf([ref(reference), null], 'Passwords do not match');

export const RequiredStringSchema = (t: any) => string()
    .required(t('FIELD_REQUIRED'));

export const RequiredArraySchema = (t: any) => string()
    .required(t('FIELD_REQUIRED'))
    .min(1, t('FIELD_REQUIRED'));

export const RequiredCurrentPasswordSchema = (t: any) => string()
    .required(t('CURRENT_PASSWORD_REQUIRED'));

export const EmailSchema = (t: any) => string()
    .email('Please enter valid E-mail address')
    .required(t('FIELD_REQUIRED'));

export const UsernameSchema = (t: any) => string()
    .min(5, 'Username must be at least 5 characters long')
    .max(50, 'Username must be at most 50 characters long')
    .required(t('FIELD_REQUIRED'));

export const UsernameOrEmailSchema = (t: any) => string()
    .required(t('FIELD_REQUIRED'));