import {User} from "appRedux/reducers/api/auth/accountSlice.types";
import {RootState} from "appRedux/store";
import {ResponseArgs} from "tools/client/client.types";

export const requestList = [

    // Login with email & password
    "login",

    // Automatic login with JWT token
    "autoLogin",

    // Login / Signup with Google account
    "googleLogin",

    // Registration with email, username and password
    "registration",

    // Logout from current 'session'
    "logout",

    // Delete user account
    "deleteAccount",

    // Disable user account
    "disableAccount",

    // Send forgot password
    "forgotPassword",

    // Request to reset password
    "resetPassword",

    // Create new password
    "createNewPassword",

    // Request new password creation
    'askSetupPassword',

    "accountConfirmation",
    "accountVerificationEmail",

    // Change email address
    "changeEmailAddress",

    // Change username
    "changeUsername",

    // Change password from user settings
    'changePassword',

    // Change file profile picture
    "changeAvatar",

    // Change GIF profile picture
    "changeAnimatedAvatar",

    // Disconnect Google account
    "disconnectFromGoogle",

    // Connect Google account
    "disconnectFromGoogle",

    // Get database info
    "getDatabaseInfo",
];

export type SupportedRequests = (typeof requestList)[number];

export interface IAuthSliceState {
    requests: {
        [name: string]: ResponseArgs;
    }
    user: User,
    databaseInfo: any,
}

export type IAuthSliceMap = {
    [K in SupportedRequests]: (state: RootState) => ResponseArgs;
}