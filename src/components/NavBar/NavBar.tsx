import { usePathname } from 'next/navigation';

import { InteractiveUserBadge } from '@/components/UserBadge/InteractiveUserBadge';
import { anonymousUsersLocations } from '@/ContentWithStore';
import WithAuth from '@/hoc/WithAuth';

const NavBar = () => {

    const pathname = usePathname();

    if (pathname && anonymousUsersLocations.includes(pathname)) {
        return null;
    }

    return <div className={'flex w-full gap-[50px] bg-neutral-900'}>
        <div></div>
        <div className={'ml-auto'}>
            <InteractiveUserBadge />
        </div>
    </div>;
};

export default WithAuth(NavBar, {
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: false,
    name: 'SideBar'
});