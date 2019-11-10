import React, {Component} from 'react';
import PageWithCenteredContent from "./common/PageWithCenteredContent.jsx";
import OverlayGradient from "../components/overlay/OverlayGradient.jsx";
import Chart from "../components/chart/MyChart.jsx";

class SortDemonstrationPage extends Component {

    render() {
        return (
            <div>
                <OverlayGradient startColor={"#3E68FFFF"} endColor={"#00000000"}/>
                <PageWithCenteredContent horizontalOnly={true}>
                    <Chart/>
                </PageWithCenteredContent>
            </div>
        );
    }
}

export default SortDemonstrationPage;