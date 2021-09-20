import React, {useCallback, useRef, useState} from "react";

import {useMediaQuery} from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import {selectorAuth, tryLogout} from "appRedux/reducers/api/account";
import EditableProfilePictureProperty from "components/EditableProfilePictureProperty/EditableProfilePictureProperty";
import {Text} from "kuchkr-react-component-library";
import IdleTimer, {useIdleTimer} from 'react-idle-timer';
import {useDispatch, useSelector} from "react-redux";

import {
    emailTextTheme,
    nameTextTheme,
    StyledAccountEmailAndPicture,
    StyledAccountInfo,
    StyledNameAndEmail,
    StyledExitLink,
    StyledLogout
} from "./style";

const AccountDisplay = () => {

    const [isActive, setActive] = useState(true);

    const dispatch = useDispatch();

    const authState = useSelector(selectorAuth);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const logout = useCallback(() => dispatch(tryLogout()), []);

    const handleOnActive = useCallback((e) => {
        console.log('user is active', e);
        console.log('time remaining', getRemainingTime());
        setActive(true);
    }, []);

    const handleOnIdle = useCallback((e) => {
        console.log('user is idle', e);
        console.log('last active', getLastActiveTime());
        setActive(false);
    }, []);

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
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
                <Text theme={emailTextTheme(isMobile)} text={authState.user.email}/>
                <StyledLogout>
                    <ExitToApp fontSize={'small'} style={{marginTop: -1, marginLeft: -2}}/>
                    <StyledExitLink to={''} onClick={logout}>Logout</StyledExitLink>
                </StyledLogout>
            </StyledNameAndEmail>
        </StyledAccountEmailAndPicture>
    </StyledAccountInfo>;
};

export default AccountDisplay;