import React from 'react';

import {Text} from '@chakra-ui/react';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {defaultShowUpAnimation} from 'components/Forms/animation';
import {useAppDispatch} from 'state/store';

import {StyledEmailSent} from './style';

export interface EmailSentDialogProps {
    title: string,
    message: string,
    resetFunc: Function
}

export const EmailSentDialog = (props: EmailSentDialogProps) => {

    const { title, message, resetFunc } = props;

    const dispatch = useAppDispatch();

    const onLoginClick = () => dispatch(resetFunc());

    return <StyledEmailSent {...defaultShowUpAnimation}>
        <div className={'popup'}>
            <div className={'imageWrapper'}>
                <img className={'emailSentIcon'} src={'assets/images/sent_mail_icon.png'} width={60} height={60}
                     alt={''}/>
            </div>
            <Text>{title}</Text>
            <Text>{message}</Text>
            <div className={'buttonGroup'}>
                <NavLink onClick={onLoginClick} to={'/'}>{'Back to sign in'}</NavLink>
            </div>
        </div>
    </StyledEmailSent>;
};