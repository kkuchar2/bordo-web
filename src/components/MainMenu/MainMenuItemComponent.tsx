import React from 'react';

import {Button, Flex, Text} from '@chakra-ui/react';
import {MainMenuItem} from 'components/MainMenu/mainMenuItems';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

export interface MainMenuItemProps {
    item: MainMenuItem,
    active: boolean,
}

export const MainMenuItemComponent = (props: MainMenuItemProps) => {

    const { item, active } = props;

    const { t } = useTranslation();

    const navigate = useNavigate();

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
                   onClick={() => item.onClick?.(navigate)}
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
