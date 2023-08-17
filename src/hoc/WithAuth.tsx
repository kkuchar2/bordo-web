import React, { ComponentType, useEffect } from 'react';

import { getAuth } from '@firebase/auth';
import { redirect, useRouter } from 'next/navigation';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { getUser } from '@/queries/account';

interface WithAuthProps {
    name?: string;
    redirectToHomeOnAutologin: boolean;
    redirectToLoginPageOnUnauthenticated: boolean;
}

const WithAuth = (WrappedComponent: ComponentType, withAuthProps: WithAuthProps) => {
    const wrappedComponent = (props: any) => {

        const app = initializeFirebase();
        const auth = getAuth(app);

        const { isLoading, isSuccess, data: user } = getUser();

        const { redirectToHomeOnAutologin, redirectToLoginPageOnUnauthenticated } = withAuthProps;

        const router = useRouter();

        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                if (!user && redirectToLoginPageOnUnauthenticated) {
                    router.push('/');
                }
            });
        }, []);

        if (!user && isLoading) {
            return <DelayedTransition pending={true}/>;
        }

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
