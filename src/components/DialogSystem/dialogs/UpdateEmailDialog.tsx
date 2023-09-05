import { useCallback, useState } from 'react';

import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential, updateEmail
} from '@firebase/auth';
import { FirebaseError } from '@firebase/util';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { changeEmailForm } from '@/components/Forms/formConfig';
import {
    ChangeEmailFormArgs
} from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert } from '@/components/Forms/util';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import { QueryResponseErrorData } from '@/queries/base';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

export const UpdateEmailDialog = (props: DialogProps) => {

    const { dialog } = props;

    const { onCancel } = dialog;

    const [pending, setPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);

    const dispatch = useAppDispatch();

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmitWithEmailPasswordAccount = useCallback(async (formData: ChangeEmailFormArgs) => {

        if (!firebaseUser) return;
        if (!firebaseUser.email) return;

        setPending(true);

        const { new_email, current_password } = formData;

        const credential = EmailAuthProvider.credential(firebaseUser.email, current_password);

        try {
            await reauthenticateWithCredential(firebaseUser, credential);
            await updateEmail(firebaseUser, new_email);
            await dispatch(closeDialog());
            showSuccessToast('Email updated');
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
        <Form<ChangeEmailFormArgs>
            config={changeEmailForm}
            className={'w-full'}
            submitButtonTextKey={'CONFIRM'}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10'}
            error={firebaseError}
            initialValues={{
                new_email: '',
                current_password: ''
            }}
            disabled={false}
            onCancel={onCancelRequest}
            onSubmit={onSubmitWithEmailPasswordAccount}/>

        <DelayedTransition pending={pending}/>
    </div>;
};