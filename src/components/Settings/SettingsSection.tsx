import React, { ReactNode } from 'react';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';

interface SettingsSectionProps {
    title: string;
    children: ReactNode;
    show?: boolean;
}

export const SettingsSection = (props: SettingsSectionProps) => {

    const { title, children, show = true } = props;

    if (!show) {
        return null;
    }

    return <Box>
        <Divider mt={2} mb={4}/>
        <Flex gap={'20px'} pt={'10px'} pb={'30px'}>
            <Flex w={'40%'}>
                <Text fontSize={'sm'} fontWeight={'medium'}>{title}</Text>
            </Flex>
            <Flex flexGrow={1} justify={'flex-end'}>
                {children}
            </Flex>
        </Flex>
    </Box>;
};