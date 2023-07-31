import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { MainMenuItem } from '@/components/MainMenu/mainMenuItems';
import { storeCurrentView } from '@/state/reducers/application/appSlice';
import { useAppDispatch } from '@/state/store';

export interface MainMenuItemProps {
    item: MainMenuItem,
    active: boolean,
}

export const MainMenuItemComponent = (props: MainMenuItemProps) => {

    const { item, active } = props;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onButtonClick = () => {
        if (item.url) {
            router.push(item.url);
            dispatch(storeCurrentView(item.id));
        }
    };
    return <button
        key={item.id}
        onClick={onButtonClick}
        className={'flex h-[40px] w-[200px] items-center gap-2 rounded-md py-0 pl-3 pr-2 '
            + (active ? 'bg-white/20 hover:bg-white/20' : 'transparent hover:bg-white/10')}>
        <div className={'truncate text-sm font-semibold text-[#bcbcbc]'}>
            {t(item.displayName)}
        </div>
        <div className={'flex grow justify-end'}>
            {item.icon && <item.icon.component width={20}/>}
        </div>
    </button>;
};
