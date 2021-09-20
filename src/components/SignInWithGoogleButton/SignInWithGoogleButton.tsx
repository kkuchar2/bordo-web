import * as React from "react";
import {useState} from "react";

import {useGoogleLogin} from "react-google-login";

import {SignInWithGoogleButtonProps} from "./SignInWithGoogleButton.types";

type ButtonContentProps = {
    children?:
        | React.ReactChild
        | React.ReactChild[];
};

const ButtonContent = (props: ButtonContentProps) => {

    const {children} = props;

    return <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        marginLeft: 0,
    }}>{children}</span>;
};

const _SignInWithGoogleButton = (props: SignInWithGoogleButtonProps) => {

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const {
        onSuccess,
        onAutoLoadFinished,
        onRequest,
        onFailure,
        onScriptLoadFailure,
        type,
        className,
        disabledStyle,
        buttonText,
        children,
        render,
        theme,
        disabled: disabledProp,
        clientId,
        cookiePolicy,
        loginHint,
        hostedDomain,
        autoLoad,
        isSignedIn,
        fetchBasicProfile,
        redirectUri,
        discoveryDocs,
        uxMode,
        scope,
        accessType,
        responseType,
        jsSrc,
        prompt
    } = props;

    const {signIn, loaded} = useGoogleLogin({
        onSuccess,
        onAutoLoadFinished,
        onRequest,
        onFailure,
        onScriptLoadFailure,
        clientId,
        cookiePolicy,
        loginHint,
        hostedDomain,
        autoLoad,
        isSignedIn,
        fetchBasicProfile,
        redirectUri,
        discoveryDocs,
        uxMode,
        scope,
        accessType,
        responseType,
        jsSrc,
        prompt
    });
    const disabled = disabledProp || !loaded;

    if (render) {
        return render({onClick: signIn, disabled});
    }

    const initialStyle = {
        backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        color: theme === 'dark' ? '#fff' : '#323232',
        border: "2px solid " + "#eaeaea",
        padding: 15,
        borderRadius: 100,
        overflow: 'hidden',
        fontSize: 13,
        fontFamily: 'inherit'
    };

    const hoveredStyle = {
        cursor: 'pointer',
        border: "2px solid " + "#d3d3d3",
        opacity: 0.9
    };

    const activeStyle = {
        cursor: 'pointer',
        backgroundColor: theme === 'dark' ? '#095cff' : '#eee',
        color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
        opacity: 1
    };

    const defaultStyle = (() => {
        if (disabled) {
            return Object.assign({}, initialStyle, disabledStyle);
        }

        if (active) {
            if (theme === 'dark') {
                return Object.assign({}, initialStyle, activeStyle);
            }

            return Object.assign({}, initialStyle, activeStyle);
        }

        if (hovered) {
            return Object.assign({}, initialStyle, hoveredStyle);
        }

        return initialStyle;
    })();

    return React.createElement('button',
        {
            onMouseEnter: () => setHovered(true),
            onMouseLeave: () => {
                setHovered(false);
                setActive(false);
            },
            onMouseDown: () => setActive(true),
            onMouseUp: () => setActive(false),
            onClick: signIn,
            style: defaultStyle,
            type,
            disabled,
            className
        },
        [<ButtonContent key={2}>
            {children || buttonText}
        </ButtonContent>
        ]
    );
};

_SignInWithGoogleButton.defaultProps = {
    type: 'button',
    tag: 'button',
    buttonText: 'Sign in with Google',
    scope: 'profile email',
    accessType: 'online',
    prompt: '',
    cookiePolicy: 'single_host_origin',
    fetchBasicProfile: true,
    isSignedIn: false,
    uxMode: 'popup',
    disabledStyle: {
        opacity: 0.6
    },
    icon: true,
    theme: 'light',
    onRequest: () => {
    }
};

export const SignInWithGoogleButton = _SignInWithGoogleButton;