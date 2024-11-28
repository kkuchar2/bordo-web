import { ReactNode, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { MainMenuItemComponent } from '@/components/MainMenu/MainMenuItemComponent';
import { Group, MainMenuItem, MainMenuItemsMap, MenuItems } from '@/components/MainMenu/mainMenuItems';
import { getUser } from '@/queries/account';

interface MainMenuProps {
    items: MenuItems,
    currentViewId: string,
}

const MainMenu = (props: MainMenuProps) => {

    const { items, currentViewId } = props;

    const { data: user } = getUser();

    const { t } = useTranslation();

    const renderGroupItems = useCallback((groupItems: MainMenuItemsMap | MainMenuItem[]): ReactNode => {
        if (Array.isArray(groupItems)) {
            return groupItems.map((item: MainMenuItem) => {
                return <MainMenuItemComponent key={item.id} item={item} active={currentViewId === item.id}/>;
            });
        }
        else {
            return renderGroupItems(Object.values(groupItems));
        }

    }, [currentViewId]);

    const renderGroup = useCallback((group: Group): ReactNode => {
        return <div className={'flex flex-col gap-2'}>
            {group.groupName && <div className={'ml-2 font-semibold text-[#848484]'}>
                {t(group.groupName)}
            </div>}
            <div className={'flex flex-col items-start gap-1'}>
                {renderGroupItems(group.groupItems)}
            </div>
        </div>;
    }, [currentViewId, t]);

    const groups = useMemo(() => Object.keys(items)
        .map((k, idx) => {
            return <div className={'flex flex-col gap-2'} key={idx}>
                {idx > 0 && <div className={'ml-2 h-px w-4/5 bg-white/20'}/>}
                {renderGroup(items[k])}
            </div>;
        }), [currentViewId, t]);

    if (!user) {
        return null;
    }

    return <div className={'align-start relative flex w-full flex-col'}>
        <div className={'flex flex-col gap-[15px]'}>{groups}</div>
    </div>;
};

export default MainMenu;
