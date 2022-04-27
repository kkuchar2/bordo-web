export const fieldTypes = {
    email: (t: any) => ({
        id: 'email',
        type: 'email',
        title: 'E-mail:',
        placeholder: t('ENTER_EMAIL_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'on',
    }),
    new_email: (t: any) => ({
        id: 'new_email',
        type: 'email',
        title: t('NEW_EMAIL_ADDRESS'),
        placeholder: t('NEW_EMAIL_ADDRESS_ENTER'),
        required: true,
        autoComplete: 'on',
    }),
    username: (t: any) => ({
        id: 'username',
        type: 'text',
        title: 'Username:',
        placeholder: t('ENTER_USERNAME_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'on',
    }),
    password: (t: any) => ({
        id: 'password',
        type: 'password',
        title: t('INPUT_PASSWORD_TITLE'),
        placeholder: t('ENTER_PASSWORD_INPUT_PLACEHOLDER'),
        required: true,
        autoComplete: 'on',
    }),
};