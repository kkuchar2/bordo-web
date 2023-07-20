import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
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

    return <Button display={'flex'}
        key={item.id}
        borderRadius={3}
        paddingLeft={3}
        paddingRight={2}
        paddingTop={0}
        justifyContent={'flex-start'}
        alignItems={'center'}
        width={'200px'}
        paddingBottom={0}
        onClick={onButtonClick}
        h={'35px'}
        gap={2}
        bg={active ? 'rgba(255,255,255,0.1)' : 'none'}>
        <Text fontSize={'14px'}
            lineHeight={'35px'}
            fontWeight={'medium'}
            color={'#bcbcbc'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}
            overflow={'hidden'}>{t(item.displayName)}</Text>
        <Flex flexGrow={1} justify={'flex-end'}>
            {item.icon && <item.icon.component width={20}/>}
        </Flex>
    </Button>;
};
