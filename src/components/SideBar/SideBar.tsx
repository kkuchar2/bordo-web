import { usePathname } from 'next/navigation';

import MainMenu from '@/components/MainMenu/MainMenu';
import { mainMenuItems } from '@/components/MainMenu/mainMenuItems';
import { UserBadge } from '@/components/UserBadge/UserBadge';
import { anonymousUsersLocations } from '@/ContentWithStore';
import WithAuth from '@/hoc/WithAuth';

const SideBar = () => {

    const pathname = usePathname();

    if (pathname && anonymousUsersLocations.includes(pathname)) {
        return null;
    }

    return <div className={'flex w-[330px] flex-col gap-[50px] bg-neutral-800/95 p-[20px]'}>
        <UserBadge />
        <MainMenu items={mainMenuItems} />
    </div>;
};

export default WithAuth(SideBar, {
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: false,
    name: 'SideBar'
});