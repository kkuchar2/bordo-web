import React, {Component} from 'react';
import PageWithCenteredContent from "./common/PageWithCenteredContent.jsx";
import OverlayGradient from "../components/overlay/OverlayGradient.jsx";
import Chart from "../components/chart/MyChart.jsx";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "../components/buttons/SubmitButton.jsx";
import Select from 'react-select';

import "./SortDemonstrationPage.scss"

class SortDemonstrationPage extends Component {

    constructor(props) {
        super(props);

        this.onSortRequest = this.onSortRequest.bind(this);
        this.onShuffleRequest = this.onShuffleRequest.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.onShuffleDataReceived = this.onShuffleDataReceived.bind(this);
        this.onSortDataReceived = this.onSortDataReceived.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.onSelectedAlgorithmChange = this.onSelectedAlgorithmChange.bind(this);

        this.worker = new Worker('./../workers/sort.worker', {type: 'module'});
        this.worker.onmessage = this.onMessageReceived;

        this.samples = 200;
        this.maxValue = 500;

        this.sortingAlgorithms = [
            {value: 0, label: "QuickSort"},
            {value: 1, label: "BubbleSort"},
            {value: 2, label: "InsertionSort"}
        ];

        this.state = {
            data: [],
            markIdx: 0,
            sorting: false,
            shuffling: false,
            dirty: false,
            selectedAlgorithm: this.sortingAlgorithms[0]
        };
    }

    componentDidMount() {
        setInterval(this.refreshState, 16);
        this.onShuffleRequest();
    }

    onMessageReceived(e) {
        let type = e.data[0];

        if (type === "sort") {
            let data = e.data[1];
            let idx = e.data[2];
            this.onSortDataReceived(data, idx);
        } else if (type === "shuffle") {
            let data = e.data[1];
            let currentShuffledCount = e.data[2];
            this.onShuffleDataReceived(data, currentShuffledCount);
        }
    }

    onShuffleDataReceived(data, idx) {
        this.state.data = data;
        this.state.markIdx = idx;
        this.state.dirty = true;

        if (idx === this.samples) {
            this.setState({shuffling: false});
            this.setState({sorting: false});
        }
    }

    onSortDataReceived(data, idx) {
        this.state.data = data;
        this.state.currIdx = this.samples;
        this.state.dirty = true;
    }

    onSortRequest() {
        this.setState({sorting: true});
        this.worker.postMessage(["sort", this.state.selectedAlgorithm.value, new Uint32Array(this.state.data)]);
    }

    onShuffleRequest() {
        this.setState({shuffling: true});
        this.worker.postMessage(["shuffle", this.samples, this.maxValue]);
    }

    refreshState() {
        if (this.state.dirty) {
            this.state.dirty = false;
            this.forceUpdate();
        }
    }

    onSelectedAlgorithmChange(option) {
        this.setState({selectedAlgorithm: option});
    }

    render() {
        return (
            <div>
                <OverlayGradient startColor={"#9E00FF"} endColor={"#0078ffff"}/>
                <PageWithCenteredContent>

                    <Grid style={{width: 1200, height: 800}} container>

                        <Grid justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5} container>
                            <Grid className="algorithmSelection" item>
                                <Select
                                    options={this.sortingAlgorithms}
                                    value={this.state.selectedAlgorithm}
                                    onChange={this.onSelectedAlgorithmChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid justify="center" alignItems="center" style={{padding: 0, margin: 0}} spacing={5} container>
                            <Grid item>
                                <SubmitButton
                                    className={"chartButton"}
                                    onClick={this.onSortRequest}
                                    disabled={this.state.sorting}
                                    text={"Sort"}>s
                                </SubmitButton>
                            </Grid>

                            <Grid item>
                                <SubmitButton
                                    className={"chartButton"}
                                    onClick={this.onShuffleRequest}
                                    disabled={this.state.shuffling}
                                    text={"Shuffle"}>
                                </SubmitButton>
                            </Grid>
                        </Grid>

                        <Grid className={"field"} style={{padding: 0}} item>
                            <Chart
                                samples={this.samples}
                                maxValue={this.maxValue}
                                data={this.state.data}
                                markIdx={this.state.markIdx}>
                            </Chart>
                        </Grid>


                    </Grid>


                </PageWithCenteredContent>
            </div>
        );
    }
}

export default SortDemonstrationPage;
