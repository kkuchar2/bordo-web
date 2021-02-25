import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";

import {AccountSettings, ProfileSettings} from './settings';

import "styles/pages/SettingsPage.scss"

export default () => {

    const [currentSetting, setCurrentSetting] = useState("PROFILE");

    const renderMap = useMemo({
        'PROFILE': () => <ProfileSettings/>,
        'ACCOUNT': () => <AccountSettings/>
    });

    return <div className={"settingsPage"}>
        <div className={"settingsWindow"}>
            <div className={"top"}>
                <FontAwesomeIcon className={"icon"} icon={faCog}/>
                <div className={"title"}>Settings</div>
            </div>
            <div className={"bottom"}>
                <div className={"leftPanel"}>
                    <ul className={"settingsList"}>
                        <li className={"settingsItem"} onClick={() => setCurrentSetting('PROFILE')}>Profile</li>
                        <li className={"settingsItem"} onClick={() => setCurrentSetting('ACCOUNT')}>Account</li>
                    </ul>
                </div>
                <div className={"rightPanel"}>
                    {renderMap[currentSetting]()}
                </div>
            </div>
        </div>
    </div>
}