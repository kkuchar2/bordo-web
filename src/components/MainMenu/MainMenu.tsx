import React, {ReactNode, useCallback, useMemo} from 'react';

import {Divider, Flex, Text} from '@chakra-ui/react';
import {MainMenuItemComponent} from 'components/MainMenu/MainMenuItemComponent';
import {Group, MainMenuItem, MainMenuItemsMap, MenuItems} from 'components/MainMenu/mainMenuItems';
import {useTranslation} from 'react-i18next';

import {getUser} from '../../queries/account';

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
        return <Flex direction={'column'} gap={2}>
            {group.groupName ? <Text fontSize={'12px'}
                                     marginLeft={2}
                                     color={'#848484'}
                                     fontWeight={'semibold'}>
                {t(group.groupName)}
            </Text> : null}
            <Flex className={'a'} direction={'column'} align={'flex-start'} gap={1}>
                {renderGroupItems(group.groupItems)}
            </Flex>
        </Flex>;
    }, [currentViewId, t]);

    const groups = useMemo(() => Object.keys(items)
        .map((k, idx) => {
            return <Flex direction={'column'} gap={3} key={idx}>
                {idx > 0 ? <Divider w={'80%'} marginLeft={2}/> : null}
                {renderGroup(items[k])}
            </Flex>;
        }), [currentViewId, t]);

    if (!user) {
        return null;
    }

    return <div className={'flex flex-col align-start relative w-full'}>
            <div className={'flex flex-col gap-[15px]'}>{groups}</div>
    </div>;
};

export default MainMenu;
