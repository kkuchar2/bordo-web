import React from 'react';

import {Center} from '@chakra-ui/react';

import WithAuth from '../hoc/WithAuth';

const Home = () => {
    return <Center h={'100%'} w={'100%'}>
    </Center>;
};

Home.displayName = 'HomePage';

export default WithAuth(Home, {
    name: 'HomePage',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
