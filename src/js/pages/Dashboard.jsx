import NavBar from "components/NavBar.jsx";
import React from "react";

import "styles/pages/Dashboard.scss";

const Dashboard = (props) => {
    return <div className={"dashboardPage"}>
        <NavBar/>
        <div className={'content'}/>
    </div>;
};

export default Dashboard;