import ResetPasswordPage from '@/pages/ResetPasswordPage/ResetPasswordPage';

export default function ResetPassword({ params }: {
    params: {
        oobCode: string,
    }
}) {
    const { oobCode } = params;
    return <ResetPasswordPage oobCode={oobCode}/>;
}