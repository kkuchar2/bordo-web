import React, {useCallback, useEffect} from 'react';

import {Button, Flex} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {useTranslation} from 'react-i18next';
import {DialogProps} from 'state/reducers/dialog/dialogSlice.types';

import {resendRegistrationEmail} from '../../../queries/account';

export interface VerifyAccountDialogProps {
    usernameOrEmail: string;
}

export const VerifyAccountDialog = (props: DialogProps<VerifyAccountDialogProps>) => {

    const { data } = props;

    const { usernameOrEmail } = data;

    const { t } = useTranslation();

    const { isIdle, isLoading, error, isSuccess, mutate } = resendRegistrationEmail();

    useEffect(() => {
        if (usernameOrEmail) {
            mutate({ username_or_email: usernameOrEmail });
        }

    }, [usernameOrEmail]);

    const onResendEmailClick = useCallback(() => {
        if (usernameOrEmail) {
            mutate({ username_or_email: usernameOrEmail });
        }
    }, [usernameOrEmail]);

    return <Flex w={'100%'} p={'10px'} align={'center'} justify={'flex-end'} gap={'20px'}>
        <Button borderRadius={0}
                fontSize={'sm'}
                disabled={isLoading}
                onClick={onResendEmailClick}
                color={'#cacaca'}>
            {t('RESEND_VERIFICATION_EMAIL')}
        </Button>
        {isLoading &&
            <DelayedTransition pending={true}
                               delay={1000}
                               position={'absolute'}
                               bottom={0}
                               left={0}
                               p={0} w={'100%'}/>}
    </Flex>;
};