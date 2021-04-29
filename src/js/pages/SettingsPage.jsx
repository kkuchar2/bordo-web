import React, {useCallback, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faUser, faLightbulb, faColumns} from "@fortawesome/free-solid-svg-icons";
import {Redirect, useLocation} from "react-router-dom";

import Button from "components/Button.jsx";

import "styles/pages/SettingsPage.scss";

function SettingsPage() {

    const [redirect, setRedirect] = useState(null);

    const location = useLocation();

    const saveSettings = useCallback(() => {
        setRedirect({pathname: "/dashboard", state: {from: location}});
    }, []);

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return <div className={"settingsPage"} style={{background: "#000000cc"}}>
        <div className={"settingsWindow"}>
            <div className={"left"}>
                <div className={"accountInfo"}>
                    <img className={"profilePicture"} src={"images/profile.png"} alt={""} width={50} height={50}/>
                    <div className={"profileDetails"}>
                        <div className={"profileName"}>Krzysztof Kucharski</div>
                        <div className={"profileEmail"}>krzysiekkucharski7@gmail.com</div>
                    </div>
                    <div className={"cogWrapper"}>
                        <FontAwesomeIcon className={"cog"} icon={faCog}/>
                    </div>
                </div>
                <div className={"menuSection"}>
                    <div className={"menuName"}>Menu</div>
                    <div className={"menuItems"}>
                        <div className={"menuItem"}>
                            <div className={"iconWrapper"} style={{background: "#0d9898"}}>
                                <FontAwesomeIcon className={"icon"} icon={faUser}/>
                            </div>
                            <div className={"menuItemText"}>Profile Settings</div>
                        </div>
                        <div className={"menuItem"}>
                            <div className={"iconWrapper"} style={{background: "#3db733"}}>
                                <FontAwesomeIcon className={"icon"} icon={faColumns}/>
                            </div>
                            <div className={"menuItemText"}>Dashboard</div>
                        </div>
                        <div className={"menuItem"}>
                            <div className={"iconWrapper"} style={{background: "#8614b0"}}>
                                <FontAwesomeIcon className={"icon"} icon={faCog}/>
                            </div>
                            <div className={"menuItemText"}>Account Settings</div>
                        </div>
                        <div className={"menuItem"}>
                            <div className={"iconWrapper"} style={{background: "#c49f32"}} >
                                <FontAwesomeIcon className={"icon"} icon={faLightbulb}/>
                            </div>
                            <div className={"menuItemText"}>Help</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"right"}>
                <div className={"panel1"}/>
                <div className={"panel2"}>
                    <Button onClick={saveSettings} className={"saveSettingsButton"} text={"Save"}/>
                </div>
            </div>
        </div>
    </div>;
}

export default SettingsPage;