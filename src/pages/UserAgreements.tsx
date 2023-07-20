import React from 'react';

import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { NavLink } from '@/components/chakra/NavLink/NavLink';

const UserAgreements = () => {
    const { t } = useTranslation();

    return <Center w={'100%'} h={'100%'}>
        <VStack padding={'20px'} spacing={'20px'}>
            <Heading>{'User Agreement'}</Heading>
            <Text lineHeight={2} maxW={'600px'}>
                {'Welcome to Website Name!\n' +
                    '\n' +
                    'These terms and conditions outline the rules and regulations for the use of Company Name\'s Website, located at Website.com.\n' +
                    '\n' +
                    'By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.\n' +
                    '\n' +
                    'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company\'s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.'}
            </Text>
            <NavLink href={'/'}>
                <Center w={'150px'} p={2} borderRadius={4} bg={'teal.600'} _hover={{
                    bg: 'teal.500'
                }}>{t('SIGN_IN')}</Center>
            </NavLink>
        </VStack>
    </Center>;
};

export default UserAgreements;