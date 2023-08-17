'use client';

import WithAuth from '@/hoc/WithAuth';

const HomePage = () => {

    return <div>
        {'Home'}
    </div>;
};

export default WithAuth(HomePage, {
    name: 'HomePage',
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true,
});
