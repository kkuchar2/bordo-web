import React, {useCallback, useEffect, useState} from "react";

import {defaultShowUpAnimation} from "components/Forms/animation";
import MainMenu from "components/MainMenu/MainMenu";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import {showSuccessToast} from "components/Toast/readyToastNotifications";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Text} from "kuchkr-react-component-library";

import {
    StyledBottomSection,
    StyledContentSection,
    StyledHomePage,
    StyledHomePageContent,
    StyledTopSection,
    StyledAnimatedHeader,
    viewTitleTextTheme
} from "./style";

const HomePage = (props: any) => {
    const [currentView, setCurrentView] = useState<IViewDescription>(mainMenuItems.pages['Account']);

    const {show} = props;

    useEffect(() => {
        showSuccessToast("Successfully logged in");
    }, []);

    const renderContent = useCallback(() => {
        const ViewComponent = currentView.component;

        return <StyledContentSection>
            <StyledTopSection>
                <StyledAnimatedHeader {...defaultShowUpAnimation}>
                    <Text theme={viewTitleTextTheme} text={currentView.displayName}/>
                </StyledAnimatedHeader>
            </StyledTopSection>
            <StyledBottomSection>
                <ViewComponent/>
            </StyledBottomSection>
        </StyledContentSection>;
    }, [currentView]);

    const onMenuItemClick = useCallback((key) => {
        setCurrentView(mainMenuItems.pages[key]);
    }, []);

    if (!show) {
        return <></>;
    }

    return <StyledHomePage>
        {/*<Chat />*/}
        <StyledHomePageContent>
            <MainMenu onItemClick={onMenuItemClick} openedView={currentView}/>
            {renderContent()}
        </StyledHomePageContent>
    </StyledHomePage>;
};

export default EnsureAuthorized(HomePage) as React.FC;