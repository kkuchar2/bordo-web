import React, {ReactNode} from 'react';

import {Box, Divider, Text} from '@chakra-ui/react';

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    show?: boolean;
}

export const SettingsSection = (props: SettingsSectionProps) => {

    const { title, description, children, show } = props;

    if (!show) {
        return null;
    }

    return <Box>
        <Text fontSize={'12px'} fontWeight={'semibold'}>{title.toUpperCase()}</Text>
        <Divider mt={2} mb={2}/>
        <Text>{description}</Text>
        <Box w={'100%'} pt={10} pb={10}>{children}</Box>
    </Box>;
};

SettingsSection.defaultProps = {
    show: true
};