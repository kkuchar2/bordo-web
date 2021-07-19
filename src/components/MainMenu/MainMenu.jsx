import {faCog, faColumns, faLightbulb, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {Button} from "kuchkr-react-component-library";
import {useDispatch, useSelector} from "react-redux";
import {selectorAuth, tryLogout} from "appRedux/reducers/api/account";
import {StyledMainMenu} from "components/MainMenu/style.js";

import React, {useCallback} from "react";

const MainMenu = (props) => {

    const authState = useSelector(selectorAuth);
    const dispatch = useDispatch();

    const renderLogoutButton = useCallback(() => {
        if (authState.loggedIn) {
            return <Button style={{marginRight: 20, marginLeft: 20}} theme={Button.darkTheme} text={"Logout"} onClick={logout} />;
        }
    }, [authState]);

    const logout = useCallback(() => dispatch(tryLogout()), []);

    return <StyledMainMenu {...animatedWindowProps}>
        <div className={"accountInfo"}>
            <img className={"profilePicture"} src={"images/profile.png"} alt={""} width={50} height={50}/>
            <div className={"profileDetails"}>
                <div className={"profileName"}>Krzysztof Kucharski</div>
                <div className={"profileEmail"}>krzysiekkucharski7@gmail.com</div>
            </div>
            {renderLogoutButton()}
        </div>
        <div className={"menuSection"}>
            <div className={"menuItems"}>
                <div className={"menuItem"}>
                    <div className={"iconWrapper"} style={{background: "#3db733"}}>
                        <FontAwesomeIcon className={"icon"} icon={faColumns}/>
                    </div>
                    <div className={"menuItemText"}>Data editor</div>
                </div>
                <div className={"menuItem"}>
                    <div className={"iconWrapper"} style={{background: "#8614b0"}}>
                        <FontAwesomeIcon className={"icon"} icon={faCog}/>
                    </div>
                    <div className={"menuItemText"}>Account Settings</div>
                </div>
            </div>
        </div>
    </StyledMainMenu>;
};

export default MainMenu;