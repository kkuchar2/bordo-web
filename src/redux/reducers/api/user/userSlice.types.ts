import {ResponseArgs} from "tools/client/client.types";

export interface EmailAddress {
    email: string;
    verified: boolean;
}

export interface UserProfile {
    avatar: string | null;
    animatedAvatar: string | null;
    useAnimatedAvatar: boolean;
}

export interface User {
    loggedIn: boolean;
    role: string | null;
    email: EmailAddress,
    username: string,
    profile: UserProfile,
}

export interface IUserSliceState {
    requests: {
        login: ResponseArgs,
        registration: ResponseArgs
        autoLogin: ResponseArgs,
        googleLogin: ResponseArgs,
        logout: ResponseArgs,
        deleteAccount: ResponseArgs,
        disableAccount: ResponseArgs,
        changeEmailAddress: ResponseArgs,
        changeUsername: ResponseArgs,
        changeFirstName: ResponseArgs,
        changePassword: ResponseArgs,
        changeAvatar: ResponseArgs,
        changeAnimatedAvatar: ResponseArgs,
        forgotPassword: ResponseArgs,
        resetPassword: ResponseArgs,
        accountConfirmation: ResponseArgs,
        accountVerificationEmail: ResponseArgs,
        testAuth: ResponseArgs
    }
    user: User
}