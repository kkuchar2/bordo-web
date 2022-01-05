import {createBaseRequestSlice} from "appRedux/reducers/generic_reducer";
import {API_URL, RootState} from "appRedux/store";
import {sendPostRequest} from "axios-client-wrapper";

export const confirmSlice = createBaseRequestSlice({name: 'confirmAccount'});

interface ConfirmSliceArgs {
    token: string | undefined,
}

export const tryConfirmAccount = (args: ConfirmSliceArgs) => {
    const {token} = args;

    if (!token) {
        console.error('Confirmation token not found');
        return;
    }

    return sendPostRequest(API_URL, 'account/confirm', {'token': token}, confirmSlice);
};

export const selectorConfirmAccount = (state: RootState) => state.confirmAccount;

export default confirmSlice.reducer;