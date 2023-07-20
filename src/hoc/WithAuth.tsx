import React, { ComponentType } from 'react';

import { redirect } from 'next/navigation';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import { getUser } from '@/queries/account';

interface WithAuthProps {
    name?: string;
    redirectToHomeOnAutologin: boolean;
    redirectToLoginPageOnUnauthenticated: boolean;
}

const WithAuth = (WrappedComponent: ComponentType, withAuthProps: WithAuthProps) => {
    const wrappedComponent = (props: any) => {

        const { isLoading, isSuccess, isError, data: user } = getUser();

        if (!user && isLoading) {
            return <DelayedTransition pending={true}
                position={'absolute'}
                bottom={0}
                left={0}
                p={0} w={'100%'}/>;
        }

        const {
            redirectToHomeOnAutologin,
            redirectToLoginPageOnUnauthenticated
        } = withAuthProps;

        if (redirectToHomeOnAutologin && user && isSuccess) {
            return redirect('/home');
        }
        else if (redirectToLoginPageOnUnauthenticated && !user) {
            return redirect('/');
        }
        else if (!redirectToHomeOnAutologin && user) {
            return <WrappedComponent {...props} />;
        }

        return <WrappedComponent {...props} />;
    };

    wrappedComponent.displayName = 'WithAuth_' + WrappedComponent.displayName;

    return wrappedComponent;
};

export default WithAuth;
