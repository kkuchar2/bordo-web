import {array, boolean, object, SchemaOf, string} from 'yup';

import {EmailAddress, GoogleAccountInfo, UserInfo, UserProfile} from './accountSlice.types';

export const UserEmailSchema: SchemaOf<EmailAddress> = object({
    email: string().required(),
    verified: boolean().required(),
});

export const UserProfileSchema: SchemaOf<UserProfile> = object({
    about: string().nullable(),
    avatar: string().nullable(),
    animated_avatar: string().nullable(),
    use_animated_avatar: boolean().required(),
    friends: array().of(object({
        id: string().required(),
        username: string().required(),
    })),
});

export const GoogleAccountInfoSchema: SchemaOf<GoogleAccountInfo> = object({
    connected: boolean().required(),
    email: string().nullable(),
});

export const UserInfoSchema: SchemaOf<UserInfo> = object({
    email: UserEmailSchema.required(),
    username: string().required(),
    profile: UserProfileSchema.required(),
    role: string().nullable(),
    google_account: GoogleAccountInfoSchema.required(),
    has_usable_password: boolean().nullable(),
});