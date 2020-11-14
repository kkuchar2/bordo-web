import moment from "moment";
import React from "react";
import packageJson from "../../../package.json";

export const getBuildDate = () => moment(packageJson.buildDate).format("DD-MM-YYYY HH:mm:SS")