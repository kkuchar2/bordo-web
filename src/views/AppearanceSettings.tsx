import React from 'react';

import { Box, Flex, useColorMode, useRadio, useRadioGroup } from '@chakra-ui/react';

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return <Box as={'label'}>
        <input {...input} />
        <Box
            {...checkbox}
            cursor={'pointer'}
            border={'none'}
            borderRadius={0}
            boxShadow={'none'}
            bg={'#282828'}
            _checked={{
                bg: 'rgba(206,138,85,0.71)',
                color: 'white',
                border: 'none'
            }}
            px={5}
            py={3}
        >
            {props.children}
        </Box>
    </Box>;
};

const AppearanceSettings = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const options = ['light', 'dark'];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'colorModeGroup',
        defaultValue: colorMode,
        onChange: () => toggleColorMode()
    });

    return <Flex direction={'column'} padding={10} gap={3} {...getRootProps()}>
        {options.map((value) => {
            const radio = getRadioProps({ value });
            return <RadioCard key={value} {...radio}>
                {value}
            </RadioCard>;
        })}
    </Flex>;
};

export default AppearanceSettings;