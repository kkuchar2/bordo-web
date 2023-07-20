import { boolean, object, ObjectSchema, string } from 'yup';

import { EmailAddress, Friend, GoogleAccountInfo, UserInfo, UserProfile } from './types';

export const UserEmailSchema: ObjectSchema<EmailAddress> = object({
    email: string().required(),
    verified: boolean().required(),
});

export const FriendSchema: ObjectSchema<Friend> = object({
    id: string().required(),
    username: string().required(),
});

export const UserProfileSchema: ObjectSchema<UserProfile> = object({
    about: string().required(),
    avatar: string().required()
});

export const GoogleAccountInfoSchema: ObjectSchema<GoogleAccountInfo> = object({
    connected: boolean().required(),
    email: string().required()
});

export const UserInfoSchema: ObjectSchema<UserInfo> = object({
    email: UserEmailSchema.required(),
    username: string().required(),
    profile: UserProfileSchema.required(),
    role: string().optional(),
    google_account: GoogleAccountInfoSchema.optional(),
    has_usable_password: boolean().optional()
});