'use client';

import { redirect, useSearchParams } from 'next/navigation';

const AuthActionPage = () => {

    const searchParams = useSearchParams();

    if (!searchParams) {
        return redirect('/');
    }

    const mode = searchParams.get('mode');
    const ooBCode = searchParams.get('oobCode');

    if (!mode) {
        return redirect('/');
    }

    if (mode === 'verifyEmail' && ooBCode) {
        return redirect(`/verifyAccount/${ooBCode}`);
    }
    else if (mode === 'resetPassword' && ooBCode) {
        return redirect(`/resetPassword/${ooBCode}`);
    }
    else if (mode == 'recoverEmail' && ooBCode) {
        return redirect(`/recoverEmail/${ooBCode}`);
    }

    return null;
};

export default AuthActionPage;
