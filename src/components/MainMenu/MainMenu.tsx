import React, {ReactNode, useCallback, useMemo} from 'react';

import {Button, Divider, Flex, Text} from '@chakra-ui/react';
import {Group, Item, ItemsMap, MenuItems} from 'components/MainMenu/mainMenuItems';
import {useTranslation} from 'react-i18next';

interface MainMenuProps {
    items: MenuItems,
    currentViewId: string,
}

const MainMenu = (props: MainMenuProps) => {

    const { items, currentViewId } = props;

    const { t } = useTranslation();

    const renderGroupItems = useCallback((groupItems: ItemsMap | Item[]): ReactNode => {
        if (Array.isArray(groupItems)) {
            return groupItems.map((item: Item) => {
                return <Button display={'flex'}
                               key={item.id}
                               borderRadius={5}
                               paddingLeft={3}
                               paddingRight={2}
                               paddingTop={0}
                               justifyContent={'flex-start'}
                               alignItems={'center'}
                               width={'200px'}
                               paddingBottom={0}
                               onClick={item.onClick}
                               h={'35px'}
                               gap={2}
                               bg={currentViewId === item.id ? 'rgba(255,255,255,0.1)' : 'transparent'}>
                    {item.icon ? <item.icon.component width={20}/> : null}
                    <Text fontSize={'14px'}
                          lineHeight={'35px'}
                          fontWeight={'medium'}
                          color={'#bcbcbc'}
                          textOverflow={'ellipsis'}
                          whiteSpace={'nowrap'}
                          overflow={'hidden'}>{t(item.displayName)}</Text>
                </Button>;
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

    return <Flex direction={'column'} align={'flex-end'}
                 width={400} bg={'#2a2a2a'} paddingTop={'20px'}>
        <Flex direction={'column'} gap={'15px'} padding={3}>
            {groups}
        </Flex>
    </Flex>;
};

export default MainMenu;
