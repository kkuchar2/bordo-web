import { ComponentType, useEffect, useState } from 'react';

import { getAuth } from '@firebase/auth';
import { redirect } from 'next/navigation';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { initializeFirebase } from '@/firebase/firebaseApp';

interface WithAuthProps {
    name?: string;
    isPublic?: boolean;
    redirectToHomeOnAutologin?: boolean;
    redirectToLoginPageOnUnauthenticated?: boolean;
}

const WithAuth = (
    WrappedComponent: ComponentType<any>,
    withAuthProps: WithAuthProps
) => {
    const wrappedComponent = (props: any) => {

        const app = initializeFirebase();
        const auth = getAuth(app);
        const user = auth.currentUser;

        const {
            isPublic = false,
            redirectToHomeOnAutologin = false,
            redirectToLoginPageOnUnauthenticated = false,
        } = withAuthProps;

        const [loggedIn, setLoggedIn] = useState(user !== null);
        const [show, setShow] = useState(false);
        const [authPending, setAuthPending] = useState(true);

        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                setAuthPending(false);
                setLoggedIn(user !== null);
                setShow(true);
            });
        }, []);

        if (!show) {
            return null;
        }

        if (isPublic) {
            if (loggedIn) {
                if (redirectToHomeOnAutologin) {
                    return redirect('/home');
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
                return redirect('/');
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
