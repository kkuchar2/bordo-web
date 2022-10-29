import React from "react";

const Index = React.lazy(() => import("./Index"));
const Account = React.lazy(() => import("./Account"));
const Friends = React.lazy(() => import("./Friends/Friends"));
const Language = React.lazy(() => import("./Language"));
const Home = React.lazy(() => import("./Home"));
const Register = React.lazy(() => import("./Register"));
const NotFound = React.lazy(() => import("./NotFound"));
const ConfirmAccount = React.lazy(() => import("./ConfirmAccount"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const GroupPreview = React.lazy(() => import("./Groups/GroupPreview"));
const UserAgreements = React.lazy(() => import("./UserAgreements"));
const UserView = React.lazy(() => import("./UserView"));


export const pages = {
    Index,
    Account,
    Friends,
    Language,
    Home,
    Register,
    NotFound,
    ConfirmAccount,
    ResetPassword,
    ForgotPassword,
    GroupPreview,
    UserAgreements,
    UserView
};
