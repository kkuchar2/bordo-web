import React from 'react';

import {Box, Center, Flex, IconButton, Text} from '@chakra-ui/react';
import {MenuAlt3Icon} from '@heroicons/react/solid';

interface Props {
    onShowSidebar: Function
    showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
    return (
        <Flex bg={'tomato'} p={4} color={'white'} justify={'center'}>
            <Box flex={'1'}>
                {showSidebarButton && (
                    <IconButton
                        icon={<MenuAlt3Icon/>}
                        colorScheme={'blackAlpha'}
                        variant={'outline'}
                        onClick={onShowSidebar}
                    />
                )}
            </Box>
            <Center flex={'1'} h={'40px'}>
                <Text fontSize={'xl'}>{'Page Title'}</Text>
            </Center>
            <Box flex={'1'}/>
        </Flex>
    );
};

export default Header;
