import { useCallback } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

export interface SentEmailDialogProps {
    showSignInButton: boolean;
    showGotItButton: boolean;
}

export const SentEmailDialog = (props: DialogProps<SentEmailDialogProps>) => {

    const { data } = props;

    const { t } = useTranslation();

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { showSignInButton = false, showGotItButton = true } = data;

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
        router.push('/');
    }, []);

    const onGotItClick = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    const button = useCallback((onClick: () => void, text: string) => {
        return <button
            className={'rounded-full bg-white/5 px-5 py-2 hover:bg-white/10'}
            onClick={onClick}>{t(text)}
        </button>;
    }, []);

    return <div className={'flex size-full items-end justify-end p-10'}>
        {showSignInButton && button(onSignInClick, 'SIGN_IN')}
        {showGotItButton && button(onGotItClick, 'GOT_IT')}
    </div>;
};