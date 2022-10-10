import React from 'react';

import {Center, Text} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {

    const {t} = useTranslation();

    return <Center w={'100%'} h={'100%'}>
        <Text>{t('PAGE_NOT_FOUND')}</Text>
    </Center>;
};

export default NotFound;