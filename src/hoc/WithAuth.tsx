import React, {ComponentType} from 'react';

import {FullSizeDelayedSpinner} from 'components/chakra/DelayedTransition/FullSizeDelayedSpinner';
import {getUser} from 'queries/account';
import {Navigate} from 'react-router-dom';

interface WithAuthProps {
    name?: string;
    redirectToHomeOnAutologin: boolean;
    redirectToLoginPageOnUnauthenticated: boolean;
}

const WithAuth = (WrappedComponent: ComponentType, withAuthProps: WithAuthProps) => {
    const wrappedComponent = (props: any) => {

        const { isLoading, isSuccess, isError, data: user } = getUser();

        if (!user && isLoading) {
            return <FullSizeDelayedSpinner pending={true}/>;
        }

        const {
            redirectToHomeOnAutologin,
            redirectToLoginPageOnUnauthenticated
        } = withAuthProps;

        if (redirectToHomeOnAutologin && (user || isSuccess)) {
            return <Navigate to={'/home'}/>;
        }
        else if (redirectToLoginPageOnUnauthenticated && !(user || isSuccess)) {
            return <Navigate to={'/'}/>;
        }
        else if (redirectToLoginPageOnUnauthenticated && !user && isError) {
            return <Navigate to={'/'}/>;
        }
        else if (!redirectToHomeOnAutologin && (user || isSuccess)) {
            return <WrappedComponent {...props} />;
        }

        return <WrappedComponent {...props} />;
    };

    wrappedComponent.displayName = 'WithAuth_' + WrappedComponent.displayName;

    return wrappedComponent;
};

export default WithAuth;