import VerifyAccountPage from '@/pages/VerifyAccountPage/VerifyAccountPage';

export default function ResetPassword({ params }: {
    params: {
        oobCode: string,
    }
}) {
    const { oobCode } = params;
    return <VerifyAccountPage oobCode={oobCode}/>;
}