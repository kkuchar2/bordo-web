import {showPasswordCreationRequiredDialog} from 'components/DialogSystem/readyDialogs';

import {QueryResponseError} from './base';

export const checkPasswordRequired = (error: QueryResponseError) => {
    const required = error?.status === 403 && error?.data?.['code'] === 'password_setup_required';

    if (required) {
        showPasswordCreationRequiredDialog();
    }
    return required;
};