import { redirect } from 'next/navigation';

type AuthActionParams = {
    mode: string;
    oobCode: string;
}

export default function AuthAction({ searchParams }: { searchParams: AuthActionParams }) {

    if (!searchParams) {
        redirect('/');
    }

    const { mode, oobCode } = searchParams;

    if (!mode || !oobCode) {
        redirect('/');
    }

    if (mode === 'verifyEmail' && oobCode) {
        redirect(`/verifyAccount/${oobCode}`);
    }
    else if (mode === 'resetPassword' && oobCode) {
        redirect(`/resetPassword/${oobCode}`);
    }
    else if (mode == 'recoverEmail' && oobCode) {
        redirect(`/recoverEmail/${oobCode}`);
    }

    redirect('/');
}