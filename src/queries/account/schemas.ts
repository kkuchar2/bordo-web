import { boolean, object, ObjectSchema, string } from 'yup';

import { Friend, GoogleAccountInfo, NewUserInfo, UserProfile } from './types';

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

export const UserInfoSchema: ObjectSchema<NewUserInfo> = object({
    email: string().required(),
    username: string().required(),
    profile: UserProfileSchema.required(),
});