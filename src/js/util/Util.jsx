import React from "react";
import packageJson from "../../../package.json";
import {footerHeight, navbarHeight} from "constants.js";

export const getBuildDate = () => packageJson.buildDate;

export const getContentHeight = otherContentHeight => {
    return window.innerHeight - footerHeight - navbarHeight - otherContentHeight;
};