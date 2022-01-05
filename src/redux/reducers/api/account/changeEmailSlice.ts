import {createBaseRequestSlice, sendPostRequest} from "appRedux/reducers/generic_reducer";
import {API_URL, AppDispatch, RootState} from "appRedux/store";

export const changeEmailSlice = createBaseRequestSlice({name: 'changeEmail'});

interface ChangeEmailArgs {
    currentEmail: string
    newEmail: string
    currentPassword: string
}

export const trySendChangeEmail = (args: ChangeEmailArgs) => {
    const {currentEmail, newEmail, currentPassword} = args;
    return sendPostRequest(API_URL, 'account/changeEmail', {
        'current_email' : currentEmail,
        'new_email': newEmail,
        'current_password': currentPassword,
    }, true, changeEmailSlice);
};

export const tryResetChangeEmailState = () => (dispatch: AppDispatch) => dispatch(onChangeEmailReset());

export const selectorChangeEmail = (state: RootState) => state.changeEmail;

export const {
    onReset : onChangeEmailReset
} = changeEmailSlice.actions;

export default changeEmailSlice.reducer;