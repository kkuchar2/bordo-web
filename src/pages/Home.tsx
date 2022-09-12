import React from 'react';

import {Center, Flex} from '@chakra-ui/react';
import {TextAreaWithEmoji} from 'components/chakra/TextAreaWithEmoji/TextAreaWithEmoji';

import WithAuth from '../hoc/WithAuth';

const Home = () => {
    return <Center height={'100vh'} width={'100%'}>
        <Flex direction={'column'} gap={'20px'}>
            <TextAreaWithEmoji
                placeholder={'Write some text with emoji\'s'}
                w={'400px'}
                h={'300px'}
                bg={'#272727'}
                maxLength={120}
                toolbarEnabled={true}
                toolbarHeight={50}
                toolbarBg={'rgba(0,0,0,0.09)'}
                emojiPickerEnabled={true}
                emojiPickerButtonTextSize={20}
                enableMaxCharacterCounter={true}
                fontSize={'xl'}
                resize={'none'}
                border={'none'}
                _hover={{ bg: '#272727' }}
                _active={{
                    bg: '#272727',
                    border: 'none',
                    boxShadow: 'none',
                }}
                _focus={{
                    bg: '#272727',
                    border: 'none',
                    boxShadow: 'none',
                }}
            />
        </Flex>
    </Center>;
};

Home.displayName = 'HomePage';

export default WithAuth(Home, {
    name: 'HomePage',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
