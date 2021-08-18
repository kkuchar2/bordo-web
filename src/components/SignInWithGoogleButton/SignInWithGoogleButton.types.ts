import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

export interface SignInWithGoogleButtonProps {
    onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
    onFailure: (error: any) => void;
    onAutoLoadFinished?: (successLogin: boolean) => void;
    onScriptLoadFailure?: (error: any) => void;
    clientId: string;
    jsSrc?: string;
    onRequest?: () => void;
    buttonText?: JSX.Element;
    scope?: string;
    className?: string;
    redirectUri?: string;
    cookiePolicy?: string;
    loginHint?: string;
    hostedDomain?: string;
    children?: JSX.Element;
    disabledStyle?: object;
    fetchBasicProfile?: boolean;
    prompt?: string;
    tag?: string;
    autoLoad?: boolean;
    disabled?: boolean;
    discoveryDocs?: Array<unknown>,
    uxMode?: string;
    isSignedIn?: boolean,
    responseType?: string;
    type?: string;
    accessType?: string;
    render?: Function,
    theme?: string;
    icon?: boolean
}