import RecoverEmailPage from '@/pages/RecoverEmailPage/RecoverEmailPage';

export default function RecoverEmail({ params }: {
    params: {
        oobCode: string,
    }
}) {
    const { oobCode } = params;
    return <RecoverEmailPage oobCode={oobCode}/>;
}