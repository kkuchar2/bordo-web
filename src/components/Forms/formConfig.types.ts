export type LoginFormArgs = {
    email: string;
    password: string;
}

export type RegistrationFormArgs = {
    email: string;
    username: string;
    password: string;
}

export type EmailArgs = {
    email: string;
}

export type ChangeAvatarFormArgs = {
    avatar: string
}

export type CreateNewPasswordFormArgs = {
    new_password: string;
    new_password_confirm: string;
}

export type ChangeUsernameFormArgs = {
    new_username: string;
    current_password: string;
}

export type ChangeEmailFormArgs = {
    new_email: string;
    current_password: string;
}

export type ResetPasswordFormArgs = {
    new_password: string;
    new_password_confirm: string;
}

export type TokenData = {
    uid: string;
    token: string;
}

export type KeyData = {
    key: string;
}

export type ResetPasswordRequestData = ResetPasswordFormArgs & TokenData

export type ChangePasswordFormArgs = {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
}

export type CurrentPasswordArgs = {
    current_password: string;
}

export type EmptyFormArgs = {}