import React, {ReactNode, useCallback, useMemo} from 'react';

import {Avatar, AvatarBadge, Center, Divider, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import {MainMenuItemComponent} from 'components/MainMenu/MainMenuItemComponent';
import {Group, MainMenuItem, MainMenuItemsMap, MenuItems} from 'components/MainMenu/mainMenuItems';
import {useTranslation} from 'react-i18next';
import {getAvatar} from 'util/util';

import {getUser} from '../../queries/account';

interface MainMenuProps {
    items: MenuItems,
    currentViewId: string,
}

const MainMenu = (props: MainMenuProps) => {

    const { items, currentViewId } = props;

    const { data: user } = getUser();

    const { t } = useTranslation();

    const avatar = getAvatar(user);

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

    return <Flex direction={'column'}
                 align={'flex-start'}
                 position={'relative'}
                 h={'100%'}
                 w={'300px'}
                 minW={'300px'}
                 bg={'rgba(0,0,0,0.15)'}
                 paddingTop={'20px'}
                 data-testid={'main-menu'}>
        <Flex padding={3} w={'100%'} justify={'flex-end'}>
            <Flex direction={'column'} gap={'15px'}>
                {groups}
            </Flex>
        </Flex>
        <Flex direction={'column'} justify={'flex-end'} flexGrow={1} width={'100%'}>
            <Center w={'100%'} p={3}>
                <HStack bg={'rgba(255,255,255,0.03)'}
                        _hover={{ bg: 'rgba(255,255,255,0.07)', cursor: 'pointer' }}
                        borderRadius={6} w={'100%'} p={3}>
                    <Avatar src={avatar}
                            name={user.username}
                            borderRadius={'100%'}
                            width={'30px'}
                            height={'30px'}
                            objectFit={'cover'}
                            {...avatar ? { bg: 'none' } : null}>
                        <AvatarBadge boxSize={'0.55em'}
                                     bg={'green.300'}
                                     border={'none'}/>
                    </Avatar>
                    <VStack spacing={1} align={'stretch'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'12px'}>{`#${user.username}`}</Text>
                        <Text color={'alphaWhite.500'} fontWeight={'medium'}
                              fontSize={'12px'}>{`${user.email.email}`}</Text>
                    </VStack>
                </HStack>
            </Center>
        </Flex>
    </Flex>;
};

export default MainMenu;
