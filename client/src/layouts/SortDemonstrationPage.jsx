import React, {Component} from 'react';
import PageWithCenteredContent from "./common/PageWithCenteredContent.jsx";
import OverlayGradient from "../components/overlay/OverlayGradient.jsx";
import Chart from "../components/chart/MyChart.jsx";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "../components/buttons/SubmitButton.jsx";

class SortDemonstrationPage extends Component {

    constructor(props) {
        super(props);
        this.onSortReuqest = this.onSortRequest.bind(this);
        this.onShuffleRequest = this.onShuffleRequest.bind(this);
    }

    onSortRequest() {

    }

    onShuffleRequest() {

    }

    render() {
        return (
            <div>
                <OverlayGradient startColor={"#2D0A7FFF"} endColor={"#421B9AFF"}/>
                <PageWithCenteredContent>
                    <Grid style={{width: 1200, height: 800}} container>

                        <Grid justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5}
                              container>
                            <Grid item>
                                <SubmitButton
                                    className={"signInButton"}
                                    onClick={this.onSortRequest}
                                    text={"Sort"}>s
                                </SubmitButton>
                            </Grid>

                            <Grid item>
                                <SubmitButton
                                    className={"signInButton"}
                                    onClick={this.onSortRequest}
                                    text={"Shuffle"}>
                                </SubmitButton>
                            </Grid>
                        </Grid>

                        <Grid className={"field"} style={{padding: 0}} item>
                            <Chart/>
                        </Grid>
                    </Grid>


                </PageWithCenteredContent>
            </div>
        );
    }
}

export default SortDemonstrationPage;