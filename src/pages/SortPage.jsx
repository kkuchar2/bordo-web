import React, {Component} from 'react';
import Chart from "components/chart/Chart.jsx";
import SubmitButton from "../components/buttons/SubmitButton.jsx";
import SelectControl from "../components/select/SelectControl.jsx";
import Spinner from "components/spinner/Spinner.jsx";
import Input from "components/input/Input.jsx";

import "./SortPage.scss"

class SortPage extends Component {

    state = {
        windowWidth: 0,
        windowHeight: 0,
        data: [],
        sorted: false,
        sorting: false,
        paused: false,
        dirty: false,
        sampleCount: 200,
        selectedAlgorithm: 0
    };

    sortingAlgorithms = ["MergeSort", "BubbleSort", "InsertionSort", "QuickSort"];

    maxValue = 1000;

    constructor(props) {
        super(props);
        this.worker = new Worker('./../workers/sort.worker', {type: 'module'});
        this.worker.onmessage = this.onMessageReceived;
    }

    updateDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
        setInterval(this.refreshState, 16);
        this.onShuffleRequest(this.state.sampleCount);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    onMessageReceived = e => {
        let type = e.data[0];

        if (type === "sort") {
            this.onSortDataReceived(e.data[1]);
        }
        else if (type === "shuffle") {
            this.onShuffleDataReceived(e.data[1]);
        }
        else if (type === "not_sorted") {
            this.onSortFinished(false);
        }
        else if (type === "sorted") {
            this.onSortFinished(true);
        }
    }

    onShuffleDataReceived = data => {
        this.setState({data: data, sorted: false});
    }

    onSortDataReceived = data => {
        this.state.data = data;
        this.state.dirty = true;
    }

    onSortFinished = isSorted => {
        this.setState({sorting: false, sorted: isSorted});
    }

    onSortButtonPressed = () => {
        if (this.state.sorted) {
            return;
        }

        if (this.state.sorting) {
            this.onPauseRequest()
        }
        else {
            this.setState({sorting: true});
            this.worker.postMessage(["sort",
                this.sortingAlgorithms[this.state.selectedAlgorithm], new Uint32Array(this.state.data)]);
        }
    }

    onStopButtonPressed = () => {
        console.log("Requesting stop")
        this.worker.postMessage(["stop"]);
    }

    onPauseRequest = () => {
        this.setState({paused: !this.state.paused});
        this.worker.postMessage(["pause"]);
    }

    onShuffleRequest = sampleCount => {
        this.setState({sorting: false});
        this.worker.postMessage(["shuffle", sampleCount, this.maxValue]);
    }

    refreshState = () => {
        if (this.state.dirty) {
            this.state.dirty = false;
            this.forceUpdate();
        }
    }

    onSelectedAlgorithmChange = option => {
        this.setState({selectedAlgorithm: option});
    }

    onSampleCountInputChange = e => {
        let v = e.target.value;
        let targetValue = 1;
        if (/^([1-9][0-9]{0,3}|10000)$/.test(v)) {
            targetValue = parseInt(v);
            this.onShuffleRequest(targetValue);
        }
        this.setState({sampleCount: v});
    };

    getSortButtonClassName = () => {
        return ["sortButton chartButton"];
    };

    getSpinnerClassName = () => {
        return ["startAnimate"];
    };

    renderSpinner = () => {
        if (this.state.sorting && !this.state.paused) {
            return <Spinner
                className={this.getSpinnerClassName()}>
            </Spinner>;
        }
    }

    renderStopButton = () => {
        if (this.state.sorting && !this.state.paused) {
            return <SubmitButton
                className={"chartButton"}
                onClick={this.onStopButtonPressed}
                disabled={false}
                text={"Abort"}>
                <img src={'src/images/stop_icon.png'} width={12} height={12} alt={""}/>
            </SubmitButton>;
        }
    }

    getPlayPauseIcon = () => {
        if (!this.state.sorting || this.state.paused) {
            return 'src/images/play_icon.png';
        }
        else {
            return 'src/images/pause_icon.png';
        }
    }

    getSortText = () => {
        if (!this.state.paused && this.state.sorting) {
            return 'Pause';
        }
        else if (this.state.paused && this.state.sorting) {
            return 'Resume';
        }
        else if (!this.state.sorting) {
            return 'Sort';
        }
    }

    render() {
        return (
            <div className={"pageComponents2"}>

                <div className={"actions"}>

                    <div className={"methodSection"}>
                        <div className={"titleContainer"}>
                            <div className={"title"}>Method:</div>
                        </div>

                        <SelectControl
                            className={"sorting-algorithm-select"}
                            options={this.sortingAlgorithms}
                            value={this.state.selectedAlgorithm}
                            disabled={this.state.sorting}
                            onChange={this.onSelectedAlgorithmChange}>
                        </SelectControl>
                    </div>

                    <div className={"sampleCountSection"}>
                        <div className={"titleContainer"}>
                            <p className={"title"}>Samples:</p>
                        </div>

                        <Input
                            id="fname"
                            name="fname"
                            value={this.state.sampleCount}
                            active={this.state.sorting}
                            onChange={this.onSampleCountInputChange}/>
                    </div>


                    <div className={"buttonsSection"}>
                        <SubmitButton
                            className={"chartButton"}
                            onClick={() => this.onShuffleRequest(this.state.sampleCount)}
                            disabled={this.state.sorting}
                            text={"Shuffle"}>
                        </SubmitButton>

                        <SubmitButton
                            className={"chartButton"}
                            onClick={this.onSortButtonPressed}
                            disabled={this.state.sorted}
                            text={this.getSortText()}>
                            <img src={this.getPlayPauseIcon()} width={12} height={12} alt={""}/>
                        </SubmitButton>

                        {this.renderStopButton()}
                        {this.renderSpinner()}
                    </div>

                </div>

                <Chart
                    samples={this.state.sampleCount}
                    maxValue={this.maxValue}
                    data={this.state.data}>
                </Chart>

            </div>);
    }
}

export default SortPage;
