'use client';

import { FC } from 'react';

import WithAuth from '@/hoc/WithAuth';

const HomePage = () => {

    return <div>
        {'Home'}
    </div>;
};

HomePage.displayName = 'HomePage';

export default WithAuth(HomePage, {
    name: 'HomePage',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as FC;
