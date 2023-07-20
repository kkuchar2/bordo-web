import { QueryResponseError } from './base';

import { showPasswordCreationRequiredDialog } from '@/components/DialogSystem/readyDialogs';

export const checkPasswordRequired = (error: QueryResponseError) => {
    const required = error?.status === 403 && error?.data?.['code'] === 'password_setup_required';

    if (required) {
        showPasswordCreationRequiredDialog();
    }
    return required;
};