import { HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { InteractiveUserBadge } from '@/components/UserBadge/InteractiveUserBadge';
import { anonymousUsersLocations } from '@/ContentWithStore';
import WithAuth from '@/hoc/WithAuth';

const NavBar = () => {

    const pathname = usePathname();

    if (pathname && anonymousUsersLocations.includes(pathname)) {
        return null;
    }

    return <div className={'flex w-full items-center gap-[50px] bg-neutral-900'}>
        <Link href={'/home'}>
            <HomeIcon className={'ml-[20px] h-6 w-6 text-white/80 hover:text-white'}/>
        </Link>
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