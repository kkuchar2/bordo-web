export interface UserAuth {
    loggedIn: boolean;
    recentlyLoggedOut: boolean;
}

export interface EmailAddress {
    email: string;
    verified: boolean;
}

export interface UserProfile {
    avatar: string | null;
    animated_avatar: string | null;
    use_animated_avatar: boolean;
}

export interface SocialInfo {
    only_social: boolean
    supported_providers: string[]
    connections: string[]
}

export interface UserInfo {
    email: EmailAddress,
    username: string,
    profile: UserProfile,
    role?: string;
    social?: SocialInfo
    lastAutologinFailed?: boolean
}

export type User = UserAuth & UserInfo;
