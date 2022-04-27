import React, {useCallback, useState} from "react";

import {ExitToApp} from "@mui/icons-material";
import {useMediaQuery} from "@mui/material";
import {getUserState} from "appRedux/reducers/api/user/userSlice";
import {logout} from "appRedux/services/userService";
import { useAppDispatch } from "appRedux/store";
import EditableProfilePictureProperty
    from "components/EditableProperties/EditableProfilePictureProperty/EditableProfilePictureProperty";
import {Text} from "kuchkr-react-component-library";
import {useIdleTimer} from 'react-idle-timer';
import { useSelector} from "react-redux";

import {
    emailTextTheme,
    nameTextTheme,
    StyledAccountEmailAndPicture,
    StyledAccountInfo,
    StyledExitLink,
    StyledLogout,
    StyledNameAndEmail
} from "./style";

const AccountDisplay = () => {

    const [isActive, setActive] = useState(true);

    const dispatch = useAppDispatch();

    const user = useSelector(getUserState);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const logoutCurrentUser = useCallback(() => dispatch(logout()), []);

    const handleOnActive = useCallback((e) => setActive(true), []);

    const handleOnIdle = useCallback((e) => setActive(false), []);

    const {getRemainingTime, getLastActiveTime} = useIdleTimer({
        timeout: 1000 * 2,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        debounce: 500,
        crossTab: {
            emitOnAllTabs: true
        }
    });

    return <StyledAccountInfo>
        <StyledAccountEmailAndPicture>
            <EditableProfilePictureProperty active={isActive}/>
            <StyledNameAndEmail>
                <Text theme={nameTextTheme(isMobile)} text={"Krzysztof Kucharski"}/>
                <Text theme={emailTextTheme(isMobile)} text={user.email.email}/>
                <StyledLogout>
                    <ExitToApp fontSize={'small'} style={{marginTop: -1, marginLeft: -2}}/>
                    <StyledExitLink to={''} onClick={logoutCurrentUser}>Logout</StyledExitLink>
                </StyledLogout>
            </StyledNameAndEmail>
        </StyledAccountEmailAndPicture>
    </StyledAccountInfo>;
};

export default AccountDisplay;