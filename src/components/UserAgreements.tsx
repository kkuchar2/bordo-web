import React from 'react';

import {Flex, Text} from '@chakra-ui/react';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {useTranslation} from 'react-i18next';

const UserAgreements = () => {

    const { t } = useTranslation();

    return <Flex flexGrow={1} direction={'column'} justify={'flex-end'}>
        <Text textAlign={'center'} fontSize={'sm'} as={'span'}>
            {t('USER_AGREEMENTS')}
            <NavLink color={'#ffffff'}
                     padding={2}
                     fontWeight={'semibold'}
                     to={'/userAgreement'}>{t('MORE')}</NavLink>
        </Text>
    </Flex>;
};

export default UserAgreements;