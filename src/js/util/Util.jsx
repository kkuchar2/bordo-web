import moment from "moment";
import React from "react";
import packageJson from "../../../package.json";
import {footerHeight, navbarHeight} from "js/constants.js";

export const getBuildDate = () => moment(packageJson.buildDate).format("DD-MM-YYYY HH:mm:SS");

export const getContentHeight = otherContentHeight => {
    return window.innerHeight - footerHeight - navbarHeight - otherContentHeight;
};