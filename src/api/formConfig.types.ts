export interface LoginFormArgs {
    email: string;
    password: string;
}

export interface SignupFormArgs {
    email: string;
    password: string;
}

export interface ForgotPasswordFormArgs {
    email: string;
}

export interface CreateNewPasswordFormArgs {
    new_password: string;
    new_password_confirm: string;
}

export interface ChangeUsernameFormArgs {
    new_username: string;
    current_password: string;
}

export interface ChangeEmailFormArgs {
    new_email: string;
    current_password: string;
}

export interface ResetPasswordFormArgs {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
}

export interface DeleteAccountFormArgs {
    current_password: string;
}