import { ComponentType, useEffect, useState } from 'react';

import { getAuth } from '@firebase/auth';
import { redirect } from 'next/navigation';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { getFirebaseApp } from '@/firebase/firebaseApp';

type WithAuthProps = {
    name?: string;
    isPublic?: boolean;
    redirectToHomeOnAutologin?: boolean;
    redirectToLoginPageOnUnauthenticated?: boolean;
}

const WithAuth = (WrappedComponent: ComponentType<any>, withAuthProps: WithAuthProps) => {

    const wrappedComponent = (props: any) => {

        const app = getFirebaseApp();
        const auth = getAuth(app);
        const user = auth.currentUser;

        const {
            isPublic = false,
            redirectToHomeOnAutologin = false,
            redirectToLoginPageOnUnauthenticated = false,
        } = withAuthProps;

        const [loggedIn, setLoggedIn] = useState(user && user.emailVerified);
        const [show, setShow] = useState(false);
        const [authPending, setAuthPending] = useState(true);

        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                setAuthPending(false);
                setLoggedIn(user !== null && user.emailVerified);
                setShow(true);
            });
        }, []);

        if (!show) {
            return null;
        }

        if (isPublic) {
            if (loggedIn) {
                if (redirectToHomeOnAutologin) {
                    redirect('/home');
                }
                if (authPending) {
                    return <DelayedTransition pending={true}/>;
                }
                return <WrappedComponent {...props} />;
            }
            else {
                return <WrappedComponent {...props} />;
            }
        }

        if (loggedIn) {
            return <WrappedComponent {...props} />;
        }
        else {
            if (redirectToLoginPageOnUnauthenticated) {
                redirect('/signin');
            }

            if (authPending) {
                return <DelayedTransition pending={true}/>;
            }
            return null;
        }
    };

    wrappedComponent.displayName = 'WithAuth_' + WrappedComponent.displayName;

    return wrappedComponent;
};

export default WithAuth;
