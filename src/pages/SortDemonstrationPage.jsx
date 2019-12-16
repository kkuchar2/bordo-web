import React, {Component} from 'react';
import Chart from "../components/chart/MyChart.jsx";
import SubmitButton from "../components/buttons/SubmitButton.jsx";
import SelectControl from "../components/select/SelectControl.jsx";

import "./SortDemonstrationPage.scss"
import OverlayGradient from "../components/overlay/OverlayGradient.jsx";

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

        this.initWorker();

        this.samples = 100;
        this.maxValue = 1000;

        this.contentWidth = 600;

        this.sortingAlgorithms = ["QuickSort", "BubbleSort", "InsertionSort"];

        this.state = {
            windowWidth: 0,
            windowHeight: 0,
            data: [],
            markIdx: 0,
            sorting: false,
            shuffling: false,
            renderOverlay: false,
            dirty: false,
            selectedAlgorithm: 0
        };
    }

    updateDimensions = () => {
        console.log("SortDemonstrationPage() updating dimensions: " + window.innerWidth + " " + window.innerHeight);
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
        setInterval(this.refreshState, 16);
        this.onShuffleRequest();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
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
        this.worker.postMessage(["sort", this.state.selectedAlgorithm, new Uint32Array(this.state.data)]);
    }

    onShuffleRequest() {
        this.initWorker();
        this.setState({shuffling: true});
        this.worker.postMessage(["shuffle", this.samples, this.maxValue]);
    }

    initWorker() {
        if (this.worker !== undefined) {
            this.worker.terminate();
        }
        this.worker = new Worker('./../workers/sort.worker', {type: 'module'});
        this.worker.onmessage = this.onMessageReceived;
    }

    refreshState() {
        if (this.state.dirty) {
            this.state.dirty = false;
            this.forceUpdate();
        }
    }

    onOpenSelect = () => {
        this.setState({renderOverlay: true});
    };

    onClosedSelect = () => {
        this.setState({renderOverlay: false});
    };

    onSelectedAlgorithmChange(option) {
        this.setState({renderOverlay: false});
        this.setState({selectedAlgorithm: option});
    }

    renderOverlay = () => {
        if (this.state.renderOverlay) {
            return <OverlayGradient startColor={"#000000ee"} endColor={"#000000ee"}/>;
        }
        else {
            return <OverlayGradient startColor={"#000000aa"} endColor={"#000000aa"}/>;
        }
    };

    render() {
        return (
            <div>

                <div className={"pageComponents"}>
                    {this.renderOverlay()}


                    <SelectControl
                        className={"sortingAlgorithmSelection"}
                        options={this.sortingAlgorithms}
                        value={this.state.selectedAlgorithm}
                        onOpen={this.onOpenSelect}
                        onClosed={this.onClosedSelect}
                        onChange={this.onSelectedAlgorithmChange}>
                    </SelectControl>

                    <div className={"actionButtons"}>
                        <SubmitButton
                            className={"sortButton chartButton"}
                            onClick={this.onSortRequest}
                            disabled={this.state.sorting}
                            text={"Sort"}>
                        </SubmitButton>

                        <SubmitButton
                            className={"shuffleButton chartButton"}
                            onClick={this.onShuffleRequest}
                            disabled={false}
                            text={"Shuffle"}>
                        </SubmitButton>
                    </div>


                    <Chart
                        samples={this.samples}
                        maxValue={this.maxValue}
                        data={this.state.data}
                        markIdx={this.state.markIdx}>
                    </Chart>

                </div>
            </div>);
    }
}

export default SortDemonstrationPage;
