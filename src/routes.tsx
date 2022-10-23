import lazy from 'react-lazy-with-preload';

import {GroupPreview} from './pages/Groups/GroupPreview';

const Register = lazy(() => import(/* webpackChunkName: "auth-chunk" */ 'pages/Register'));
const ConfirmAccount = lazy(() => import (/* webpackChunkName: "auth-chunk" */ 'pages/ConfirmAccount'));
const Index = lazy(() => import (/* webpackChunkName: "auth-chunk" */ 'pages/Index'));
const ForgotPassword = lazy(() => import (/* webpackChunkName: "auth-chunk" */ 'pages/ForgotPassword'));
const ResetPassword = lazy(() => import (/* webpackChunkName: "auth-chunk" */ 'pages/ResetPassword'));
const Home = lazy(() => import (/* webpackChunkName: "home" */ 'pages/Home'));
const UserView = lazy(() => import (/* webpackChunkName: "home" */ 'pages/UserView'));
const UserAgreements = lazy(() => import (/* webpackChunkName: "user-agreements" */ 'pages/UserAgreements'));
const Account = lazy(() => import (/* webpackChunkName: "account" */ 'pages/Account'));
const Friends = lazy(() => import (/* webpackChunkName: "friends" */ 'pages/Friends/Friends'));
const Groups = lazy(() => import (/* webpackChunkName: "groups" */ 'pages/Groups/Groups'));
const Chats = lazy(() => import (/* webpackChunkName: "chat" */ 'pages/Chats/Chats'));
const Language = lazy(() => import (/* webpackChunkName: "language" */ 'pages/Language'));
const NotFound = lazy(() => import (/* webpackChunkName: "not-found" */ 'pages/NotFound'));

export const routes = [
    {
        path: '*',
        element: NotFound,
        name: 'NotFound',
    },
    {
        path: '/',
        element: Index,
        name: 'Index',
    },
    {
        path: '/register',
        element: Register,
        name: 'Registration',
    },
    {
        path: '/verify-email/:token',
        element: ConfirmAccount,
        name: 'ConfirmAccount',
    },
    {
        path: '/home',
        element: Home,
        name: 'Home',
    },
    {
        path: '/account',
        element: Account,
        name: 'Account',
    },
    {
        path: '/friends',
        element: Friends,
        name: 'Friends',
    },
    {
        path: '/groups/:uuid',
        element: GroupPreview,
        name: 'GroupPreview',
    },
    {
        path: '/language',
        element: Language,
        name: 'Language',
    },
    // {
    //     path: '/chats',
    //     element: Chats,
    //     name: 'Chats',
    // },
    {
        path: '/forgotPassword',
        element: ForgotPassword,
        name: 'ForgotPasswordPage',
    },
    {
        path: '/resetPassword/:token',
        element: ResetPassword,
        name: 'ResetPassword',
    },
    {
        path: '/userAgreement',
        element: UserAgreements,
        name: 'UserAgreements',
    },
    {
        path: '/user/:username',
        element: UserView,
        name: 'UserView',
    }
];