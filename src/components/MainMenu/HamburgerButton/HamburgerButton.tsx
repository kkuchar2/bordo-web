import React from 'react';

import { StyledHamburgerButton, StyledHamburgerButtonInner } from './style';

interface HamburgerButtonProps {
    onClick: () => void;
    navbarOpened: boolean;
    topNavbarVisible: boolean;
}

export const HamburgerButton = (props: HamburgerButtonProps) => {

    const { onClick, navbarOpened, topNavbarVisible } = props;

    return <StyledHamburgerButton navbarOpened={navbarOpened} topNavbarVisible={topNavbarVisible} onClick={onClick}>
        <StyledHamburgerButtonInner navbarOpened={navbarOpened} topNavbarVisible={topNavbarVisible}/>
    </StyledHamburgerButton>;
};