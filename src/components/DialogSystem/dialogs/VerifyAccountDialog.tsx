import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { resendRegistrationEmail } from '@/queries/account';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';

export interface VerifyAccountDialogProps {
    usernameOrEmail: string;
}

export const VerifyAccountDialog = (props: DialogProps<VerifyAccountDialogProps>) => {

    const { data } = props;

    const { t } = useTranslation();

    if (!data) {
        return null;
    }

    const { usernameOrEmail } = data;

    const query = resendRegistrationEmail();

    const onResendEmailClick = useCallback(() => {
        if (usernameOrEmail) {
            query.mutate({ username_or_email: usernameOrEmail });
        }
    }, [usernameOrEmail]);

    return <div className={'flex w-full flex-col items-center justify-end gap-[20px] p-[10px]'}>
        <button
            className={'rounded-full bg-white/5 px-5 py-2 hover:bg-white/10'}
            disabled={query.isLoading}
            onClick={onResendEmailClick}>
            {t('RESEND_VERIFICATION_EMAIL')}
        </button>
        <DelayedTransition pending={query.isLoading}/>
    </div>;
};