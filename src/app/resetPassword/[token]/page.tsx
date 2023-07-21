import ResetPasswordPage from '@/pages/ResetPasswordPage/ResetPasswordPage';

export default function ResetPassword({ params }: {
    params: {
        token: string,
    }
}) {
    const { token } = params;
    return <ResetPasswordPage token={token}/>;
}