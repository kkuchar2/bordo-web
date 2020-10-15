import React, {Component} from 'react';
import OverlayGradient from "../components/overlay/OverlayGradient.jsx";

import "./MainPage.scss"

class MainPage extends Component {

    render() {
        return (
            <div>
                <div className={"pageComponents"}>
                    <OverlayGradient startColor={"rgba(174,77,129,0.67)"} endColor={"rgba(215,83,65, 0.8)"}/>
                </div>
            </div>);
    }
}

export default MainPage;
