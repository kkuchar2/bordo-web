import { pages } from "./pages";

export const routes = [
    {
        path: '*',
        element: pages.NotFound,
        name: 'NotFound',
    },
    {
        path: '/',
        element: pages.Index,
        name: 'Index',
    },
    {
        path: '/register',
        element: pages.Register,
        name: 'Registration',
    },
    {
        path: '/verify-email/:token',
        element: pages.ConfirmAccount,
        name: 'ConfirmAccount',
    },
    {
        path: '/home',
        element: pages.Home,
        name: 'Home',
    },
    {
        path: '/account',
        element: pages.Account,
        name: 'Account',
    },
    {
        path: '/friends',
        element: pages.Friends,
        name: 'Friends',
    },
    {
        path: '/groups/:uuid',
        element: pages.GroupPreview,
        name: 'GroupPreview',
    },
    {
        path: '/language',
        element: pages.Language,
        name: 'Language',
    },
    {
        path: '/forgotPassword',
        element: pages.ForgotPassword,
        name: 'ForgotPasswordPage',
    },
    {
        path: '/resetPassword/:token',
        element: pages.ResetPassword,
        name: 'ResetPassword',
    },
    {
        path: '/userAgreement',
        element: pages.UserAgreements,
        name: 'UserAgreements',
    },
    {
        path: '/user/:username',
        element: pages.UserView,
        name: 'UserView',
    }
];
