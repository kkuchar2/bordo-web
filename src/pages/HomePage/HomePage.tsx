'use client';

import WithAuth from '@/hoc/WithAuth';

const HomePage = () => {

    return <div className={'relative h-full w-full bg-neutral-800'}>
    </div>;
};

export default WithAuth(HomePage, {
    name: 'HomePage',
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true,
});
