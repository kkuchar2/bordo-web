import React from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { NavLink } from '@/components/NavLink/NavLink';

const UserAgreements = () => {

    const { t } = useTranslation();

    return <Flex flexGrow={1} direction={'column'} justify={'flex-end'}>
        <Text textAlign={'center'} fontSize={'sm'} as={'span'}>
            {t('USER_AGREEMENTS')}
            <NavLink className={'p-2 font-semibold text-white'}
                href={'/userAgreement'}>
                {t('MORE')}
            </NavLink>
        </Text>
    </Flex>;
};

export default UserAgreements;