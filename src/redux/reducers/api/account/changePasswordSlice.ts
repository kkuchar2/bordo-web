import {createBaseRequestSlice, sendPostRequest} from "appRedux/reducers/generic_reducer";
import {API_URL, AppDispatch, RootState} from "appRedux/store";

export const changePasswordSlice = createBaseRequestSlice({name: 'changePassword'});

interface ChangePasswordArgs {
    currentEmail : string,
    currentPassword: string,
    newPassword1: string,
    newPassword2: string,
}

export const trySendChangePassword = (args: ChangePasswordArgs) => {
    const {currentEmail, currentPassword, newPassword1, newPassword2} = args;
    return sendPostRequest(API_URL, 'account/changePassword', {
        'current_email' : currentEmail,
        'current_password': currentPassword,
        'new_password1': newPassword1,
        'new_password2': newPassword2
    }, true, changePasswordSlice);
};

export const tryResetChangePasswordState = () => (dispatch: AppDispatch) => dispatch(onChangePasswordReset());

export const selectorChangePassword = (state: RootState) => state.changePassword;

export const {
    onReset : onChangePasswordReset
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;