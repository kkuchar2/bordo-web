import { use } from 'react';

import ResetPasswordPage from '@/page/ResetPasswordPage/ResetPasswordPage';

type ResetPasswordProps = Promise<{
    token: string;
}>

export default function ResetPassword(props: { params: ResetPasswordProps }) {
    const { token } = use(props.params);
    return <ResetPasswordPage token={token}/>;
}