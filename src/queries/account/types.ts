export interface UserAuth {
    loggedIn: boolean;
    recentlyLoggedOut: boolean;
}

export interface EmailAddress {
    email: string;
    verified: boolean;
}

export interface Friend {
    id: string;
    username: string;
}

export interface UserProfile {
    about: string;
    avatar: string;
    friends: Friend[];
}

export interface GoogleAccountInfo {
    connected: boolean;
    email: string;
}

export interface UserInfo {
    email: EmailAddress,
    username: string,
    profile: UserProfile,
    role: string;
    google_account: GoogleAccountInfo;
    has_usable_password: boolean;
}

export type User = UserAuth & UserInfo;
