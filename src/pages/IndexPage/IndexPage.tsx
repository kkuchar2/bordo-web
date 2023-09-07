'use client';

import { useCallback } from 'react';

import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import Link from 'next/link';

import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { getUser } from '@/queries/account';

const IndexPage = () => {

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const userQuery = getUser();

    const signInWithGoogleFirebase = useCallback(async () => {
        try {
            await signInWithPopup(auth, provider);
            await userQuery.refetch();
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/cancelled-popup-request') {
                return;
            }
            else {
                console.error(e);
            }
        }
    }, []);

    return <div className={'flex w-full items-center justify-center bg-black p-[20px]'}>

        <Link
            href={'/signin'}
            className={'absolute right-[20px] top-[20px] flex h-12 items-center justify-center gap-[10px] rounded-md bg-neutral-900 px-3 font-medium text-white hover:bg-neutral-800'}>
            {'Sign in'}
        </Link>

        <div className={'flex flex-col gap-[50px]'}>
            <div className={'flex max-w-[1000px]'}>
                <div className={'flex flex-col items-center gap-[20px]'}>
                    <div className={'text-center text-4xl font-black tracking-tight md:text-6xl'}>
                        {'Bordo.app'}
                    </div>
                    <div className={'max-w-[800px] text-center text-lg tracking-wider md:text-xl'}>
                        {'Whatever this project is it will allow you achieve your goals (whatever they are) in a more efficient way.'}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col items-center justify-center gap-[20px] md:flex-row'}>
                <Link
                    href={'/signup'}
                    className={'flex h-12 w-[230px] items-center justify-center gap-[10px] rounded-md bg-neutral-900 px-3 font-medium text-white hover:bg-neutral-950'}>
                    {'Sign up with email'}
                </Link>

                <button
                    onClick={signInWithGoogleFirebase}
                    className={'flex h-12 w-[230px] items-center justify-center gap-[10px] rounded-md bg-neutral-900 px-3 font-medium text-white hover:bg-neutral-950'}>
                    <GoogleIcon/>
                    {'Continue with Google'}
                </button>
            </div>
        </div>
    </div>;
};

export default WithAuth(IndexPage, {
    name: 'IndexPage',
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
});