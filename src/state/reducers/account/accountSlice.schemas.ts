import {array, boolean, object, SchemaOf, string} from "yup";

import {EmailAddress, SocialInfo, UserInfo, UserProfile} from "./accountSlice.types";

export const UserEmailSchema: SchemaOf<EmailAddress> = object({
    email: string().required(),
    verified: boolean().required(),
});

export const UserProfileSchema: SchemaOf<UserProfile> = object({
    avatar: string().nullable(),
    animated_avatar: string().nullable(),
    use_animated_avatar: boolean().required(),
});

export const SocialSchema: SchemaOf<SocialInfo> = object({
    only_social: boolean().required(),
    connections: array().of(string()).required(),
    supported_providers: array().of(string()).required()
});

export const UserInfoSchema: SchemaOf<UserInfo> = object({
    email: UserEmailSchema.required(),
    username: string().required(),
    profile: UserProfileSchema.required(),
    role: string().nullable(),
    social: SocialSchema.required(),
    lastAutologinFailed: boolean().nullable(),
});