'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Circle, Flex, Icon, Input, Text, useRadio, useRadioGroup } from '@chakra-ui/react';
import { PL, US } from 'country-flag-icons/react/3x2';

import { SUPPORTED_LANGUAGES } from '@/config';
import WithAuth from '@/hoc/WithAuth';
import i18n from '@/i18n';

const CircleIcon = (props) => (
    <Icon viewBox={'0 0 200 200'} {...props}>
        <path
            fill={'currentColor'}
            d={'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'}
        />
    </Icon>
);

const flags = {
    'en': {
        names: {
            'en': 'English',
            'pl': 'Angielski'
        },
        component: () => <US title={'United States'}/>
    },
    'pl': {
        names: {
            'en': 'Polish',
            'pl': 'Polski'
        },
        component: () => <PL title={'Poland'}/>
    },
};

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    const renderIcon = useMemo(() => {
        if (props.isChecked) {
            return <Circle borderWidth={1} borderColor={'white'}>
                <CircleIcon boxSize={5}/>
            </Circle>;
        }
        return <Circle borderWidth={1} borderColor={'white'}>
            <CircleIcon boxSize={5} color={'transparent'}/>
        </Circle>;
    }, [props.isChecked]);

    const FlagComponent = useMemo(() => {
        if (props.value in flags) {
            return flags[props.value].component;
        }
        return null;
    }, [props.value]);

    return <Box as={'label'}>
        <Input {...input}/>
        <Flex
            {...checkbox}
            cursor={'pointer'}
            border={'none'}
            gap={3}
            borderRadius={4}
            align={'center'}
            boxShadow={'none'}
            bg={'#282828'}
            _hover={{
                bg: '#464646'
            }}
            _checked={{
                bg: '#464646',
                color: 'white',
                border: 'none'
            }}
            px={5}
            py={3}
        >
            {renderIcon}
            {props.children}
            <Flex flexGrow={1} justify={'flex-end'} gap={2}>
                <Text fontSize={'13px'} color={'#9e9e9e'}>{flags[props.value].names[props.current]}</Text>
                <Box w={'30px'} alignSelf={'flex-end'}>
                    <FlagComponent/>
                </Box>
            </Flex>
        </Flex>
    </Box>;
};

const LanguagePage = () => {
    const [selected, setSelected] = useState(localStorage.getItem('i18nextLng'));

    useEffect(() => {
        i18n.changeLanguage(selected);
    }, [selected]);

    const onChange = useCallback((value: any) => {
        setSelected(value);
    }, []);

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'languageGroup',
        defaultValue: selected,
        onChange: setSelected
    });

    return <Flex direction={'column'} padding={10} maxWidth={600} gap={3} {...getRootProps()}>
        {SUPPORTED_LANGUAGES.map((value) => {
            const radio = getRadioProps({ value });
            return <RadioCard key={value} current={selected} {...radio}>
                {value}
            </RadioCard>;
        })}
    </Flex>;
};

LanguagePage.displayName = 'Language';

export default WithAuth(LanguagePage, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: false
}) as FC;