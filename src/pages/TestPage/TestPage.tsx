import React, {useCallback} from "react";

import {getTestAuthState, getUserState} from "appRedux/reducers/api/user/userSlice";
import {logout, testAuthAction} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {confirmButtonTheme} from "components/Dialogs/commonStyles";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Button} from "kuchkr-react-component-library";
import ReactJson from 'react-json-view';
import {useSelector} from "react-redux";

import {StyledTestPage, StyledTestPageContent} from "./style";

const TestPage = () => {

    const userState = useSelector(getUserState);

    const dispatch = useAppDispatch();

    const testAuthState = useSelector(getTestAuthState);

    const logoutCurrentUser = useCallback(() => dispatch(logout()), []);

    const onAuthAuctionPress = useCallback(() => dispatch(testAuthAction()), []);

    return <StyledTestPage>
        <StyledTestPageContent>
            <div>{`Email: ${userState.email.email}`}</div>
            <div>{`Verified: ${userState.email.verified}`}</div>
            <div>{`Logged in: ${userState.loggedIn}`}</div>
            <div>{`Profile:`}</div>
            <div>{`Avatar: ${userState.profile.avatar}`}</div>
            <div>{`Role: ${userState.role}`}</div>
            <button onClick={logoutCurrentUser}>Logout</button>
            <button onClick={onAuthAuctionPress}>Perform authenticated action</button>
            <ReactJson enableClipboard={false} theme='monokai' src={testAuthState}/>

            <Button theme={confirmButtonTheme}>

            </Button>
        </StyledTestPageContent>
    </StyledTestPage>;
};

export default EnsureAuthorized(TestPage) as React.FC;