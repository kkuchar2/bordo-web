import ConfirmAccountPage from '@/pages/ConfirmAccountPage/ConfirmAccountPage';

export default function VerifyEmail({ params }: {
    params: {
        token: string,
    }
}) {
    const { token } = params;
    return <ConfirmAccountPage token={token}/>;
}