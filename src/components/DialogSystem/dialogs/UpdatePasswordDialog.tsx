import React, { useCallback, useState } from 'react';

import {
    EmailAuthProvider,
    getAuth,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    updatePassword
} from '@firebase/auth';
import { FirebaseError } from '@firebase/util';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { updatePasswordForm, updatePasswordFormSmall } from '@/components/Forms/formConfig';
import { UpdatePasswordFormArgs, UpdatePasswordFormSmallArgs } from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert } from '@/components/Forms/util';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { QueryResponseErrorData } from '@/queries/base';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { BaseDialogProps, DialogProps } from '@/state/reducers/dialog/dialogSlice.types';

export const UpdatePasswordDialog = (props: DialogProps & BaseDialogProps) => {

    const { dialog, dispatch } = props;

    const { onCancel } = dialog;

    const [pending, setPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);

    const app = initializeFirebase();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const isGoogleProvider = firebaseUser?.providerData[0].providerId === 'google.com';

    const isPasswordProvider = firebaseUser?.providerData[0].providerId === 'password';

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmitWithGoogleProvider = useCallback(async (formData: UpdatePasswordFormSmallArgs) => {
        if (!firebaseUser) return;

        setPending(true);

        try {
            await reauthenticateWithPopup(firebaseUser, new GoogleAuthProvider());
            await updatePassword(firebaseUser, formData.new_password);
            await dispatch(closeDialog());
            showSuccessToast('Password updated');
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/weak-password') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'new_password'));
            }
        }

        setPending(false);
    }, [firebaseUser]);

    const onSubmitWithEmailPasswordAccount = useCallback(async (formData: UpdatePasswordFormArgs) => {

        if (!firebaseUser) return;
        if (!firebaseUser.email) return;

        setPending(true);

        const { current_password } = formData;

        const credential = EmailAuthProvider.credential(firebaseUser.email, current_password);

        try {
            await reauthenticateWithCredential(firebaseUser, credential);
            await updatePassword(firebaseUser, formData.new_password);
            await dispatch(closeDialog());
            showSuccessToast('Password updated');
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/weak-password') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'new_password'));
            }
            else if (firebaseError.code === 'auth/wrong-password') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'current_password'));
            }
        }

        setPending(false);
    }, [firebaseUser]);

    return <div className={'w-full min-w-[400px]'}>
        {isGoogleProvider && <Form<UpdatePasswordFormSmallArgs>
            config={updatePasswordFormSmall}
            className={'w-full'}
            submitButtonTextKey={'CONFIRM'}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10'}
            error={firebaseError}
            initialValues={{
                new_password: '',
                new_password_confirm: ''
            }}
            disabled={false}
            onCancel={onCancelRequest}
            onSubmit={onSubmitWithGoogleProvider}/> }

        {isPasswordProvider && <Form<UpdatePasswordFormArgs>
            config={updatePasswordForm}
            className={'w-full'}
            submitButtonTextKey={'CONFIRM'}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10'}
            error={firebaseError}
            initialValues={{
                current_password: '',
                new_password: '',
                new_password_confirm: ''
            }}
            disabled={false}
            onCancel={onCancelRequest}
            onSubmit={onSubmitWithEmailPasswordAccount}/> }

        <DelayedTransition pending={pending}/>
    </div>;
};