import { use } from 'react';

import ConfirmAccountPage from '@/page/ConfirmAccountPage/ConfirmAccountPage';

type VerifyEmailProps = Promise<{
    token: string;
}>

export default function VerifyEmail(props: { params: VerifyEmailProps }) {
    const { token } = use(props.params);
    return <ConfirmAccountPage token={token}/>;
}