export type LoginFormArgs = {
    username_or_email: string;
    password: string;
}

export type RegistrationFormArgs = {
    email: string;
    username: string;
    password: string;
}

export type ForgotPasswordFormArgs = {
    email: string;
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

export type ChangePasswordFormArgs = {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
}

export type DeleteAccountFormArgs = {
    current_password: string;
}

export type EmptyFormArgs = {}