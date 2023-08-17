'use client';

import OpenStreetMap from '@/components/OpenStreetMap/OpenStreetMap';
import WithAuth from '@/hoc/WithAuth';

const HomePage = () => {

    return <div className={'relative h-full w-full'}>
        <OpenStreetMap />
    </div>;
};

export default WithAuth(HomePage, {
    name: 'HomePage',
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true,
});
