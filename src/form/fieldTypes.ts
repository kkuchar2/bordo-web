import { FormikInput } from '@/components/FormikInput/FormikInput';
import { FieldConfig } from '@/form/formConfig';

type FieldTypesMap = {
    [key: string]: (t: any) => FieldConfig;
}

export const fieldTypes: FieldTypesMap = {
    email: (t: any) => ({
        id: 'email',
        name: 'email',
        type: 'email',
        label: t('EMAIL'),
        placeholder: t('ENTER_EMAIL_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'email',
        component: FormikInput
    }),
    new_email: (t: any) => ({
        id: 'new_email',
        name: 'new_email',
        type: 'email',
        label: t('NEW_EMAIL_ADDRESS'),
        placeholder: t('NEW_EMAIL_ADDRESS_ENTER'),
        required: true,
        autoComplete: 'on',
        component: FormikInput
    }),
    new_username: (t: any) => ({
        id: 'new_username',
        name: 'new_username',
        type: 'text',
        label: t('NEW_USERNAME'),
        placeholder: t('ENTER_NEW_USERNAME_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'off',
        component: FormikInput
    }),
    username: (t: any) => ({
        id: 'username',
        name: 'username',
        type: 'text',
        label: t('USERNAME'),
        placeholder: t('ENTER_USERNAME_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'on',
        component: FormikInput
    }),
    password: (t: any) => ({
        id: 'password',
        name: 'password',
        type: 'password',
        label: t('PASSWORD'),
        placeholder: t('ENTER_PASSWORD'),
        required: true,
        autoComplete: 'current-password',
        component: FormikInput
    }),
    current_password: (t: any) => ({
        id: 'current_password',
        name: 'current_password',
        type: 'password',
        label: t('CURRENT_PASSWORD'),
        placeholder: t('CURRENT_PASSWORD_ENTER'),
        required: true,
        autoComplete: 'current-password',
        component: FormikInput
    }),
    new_password: (t: any) => ({
        id: 'new_password',
        name: 'new_password',
        type: 'password',
        label: t('NEW_PASSWORD'),
        placeholder: t('NEW_PASSWORD_ENTER'),
        required: true,
        autoComplete: 'off',
        component: FormikInput
    }),
    new_password_confirm: (t: any) => ({
        id: 'new_password_confirm',
        name: 'new_password_confirm',
        type: 'password',
        label: t('NEW_PASSWORD_CONFIRM'),
        placeholder: t('INPUT_PASSWORD_CONFIRM_PLACEHOLDER'),
        required: true,
        autoComplete: 'off',
        component: FormikInput
    }),
    username_or_email: (t: any) => ({
        id: 'username_or_email',
        name: 'username_or_email',
        type: 'text',
        label: t('USERNAME_OR_EMAIL'),
        placeholder: t('ENTER_USERNAME_OR_EMAIL_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'on',
        component: FormikInput
    })
};
