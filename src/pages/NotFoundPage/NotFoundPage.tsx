import React from 'react';

import {Text} from '@chakra-ui/react';
import {NavLink} from 'components/chakra/NavLink/NavLink';

import {StyledNotFound, StyledNotFoundTextWithIcon} from './style';

const NotFoundPage = () => {
    return <StyledNotFound>
        <StyledNotFoundTextWithIcon>
            <Text>{'Page not found'}</Text>
        </StyledNotFoundTextWithIcon>
        <NavLink to={'/'} className={'signInLink'}>{'Home'}</NavLink>
    </StyledNotFound>;
};

export default NotFoundPage;