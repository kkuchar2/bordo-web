import React, {useEffect, useState, useCallback} from 'react';
import BarsView from "components/BarsView";
import Button from "components/Button";
import SelectControl from "components/SelectControl";
import {registerSortWorker, unregisterWorker, sendMessage} from "workers/workers.js";
import {useEffectWithNonNull} from "util/util.js";
import Input from "components/Input";
import Slider, {createSliderWithTooltip} from 'rc-slider';
import validator from 'validator';

import 'rc-slider/assets/index.css';

import "styles/pages/SortPage.scss";
import Text from "components/Text.jsx";

const sortingAlgorithms = ["MergeSort", "BubbleSort", "InsertionSort", "QuickSort"];

const marks = {};

const maxValue = 2000;

const logPosition = (value, min, max) => {
    const minPosition = 0;
    const maxPosition = 100;
    const minValue = Math.log(min);
    const maxValue = Math.log(max);
    const scale = (maxValue - minValue) / (maxPosition - minPosition);
    return (Math.log(value) - minValue) / scale + minPosition;
}

const logSlider = (position, min, max) => {
    const minPosition = 0;
    const maxPosition = 100;
    const minValue = Math.log(min);
    const maxValue = Math.log(max);
    const scale = (maxValue - minValue) / (maxPosition - minPosition);
    return Math.exp(minValue + scale * (position - minPosition));
}

const calcLogPos = (v) => logPosition(v, 1, maxValue)
const calcLogVal = (v) => logSlider(v, 1, maxValue)


marks[calcLogPos(1)] = <p>{1}</p>;
marks[calcLogPos(maxValue / 100)] = <p>{maxValue / 100}</p>;
marks[calcLogPos(maxValue / 10)] = <p>{maxValue / 10}</p>;
marks[calcLogPos(maxValue)] = {
    style: {
        color: '#00b0ff',
    },
    label: <p>{maxValue}</p>,
};




function SortPage() {

    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [sorting, setSorting] = useState(false);
    const [paused, setPaused] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const [sampleCount, setSampleCount] = useState(maxValue / 2);
    const [maxSpacing, setMaxSpacing] = useState(5);
    const [worker, setWorker] = useState(null);

    const messageHandlersMap = {
        "sort": payload => setData(payload),
        "shuffle": payload => onShuffleDataReceived(payload),
        "sortFinished": payload => onSortFinished(payload.sorted)
    };

    useEffect(() => {
        const onMessageReceived = e => messageHandlersMap[e.data.type](e.data.payload);
        setWorker(registerSortWorker(onMessageReceived));
        return () => unregisterWorker(worker);
    }, []);

    useEffectWithNonNull(() => onShuffleRequest(sampleCount), [worker]);

    const onShuffleDataReceived = useCallback(receivedData => {
        setData(receivedData);
        setSorted(false);
    }, []);

    const onSortFinished = useCallback(isSorted => {
        setSorting(false);
        setSorted(isSorted);
    }, []);

    const onStartPauseButtonPressed = useCallback(() => {
        if (sorted) {
            return;
        }

        if (sorting) {
            setSorting(false);
            setPaused(!paused);
            sendMessage(worker, "pause");
        }
        else {
            setPaused(false);
            setSorting(true);
            sendMessage(worker, "sort", {algorithm: sortingAlgorithms[selectedAlgorithm]});
        }
    }, [worker, sorting, sorted, selectedAlgorithm]);

    const onStopButtonPressed = useCallback(() => sendMessage(worker, "stop"), [worker]);

    const onShuffleRequest = useCallback(samples => {
        setSorting(false);
        sendMessage(worker, "shuffle", {sampleCount: samples, maxValue: maxValue});
    }, [worker]);

    const onSampleCountInputChange = useCallback(e => {
        const number = validator.toInt(e.target.value);

        if (number >= 1 && number <= maxValue) {
            setSampleCount(number)
        }

    }, [worker]);

    useEffectWithNonNull(() => onShuffleRequest(sampleCount), [sampleCount, worker])

    const onSampleCountSliderChange = useCallback(v => setSampleCount(Math.ceil(calcLogVal(v))), [worker]);

    const getPlayPauseIcon = useCallback(() => {
        return !sorting || paused ? 'images/play_icon.png' : 'images/pause_icon.png';
    }, [sorting, paused]);

    const getStartButtonText = useCallback(() => {
        return !sorting || paused ? "Sort" : "Pause";
    }, [sorting, paused])

    const onSelectedAlgorithmChange = useCallback(setSelectedAlgorithm);

    return <div className={"sortPage"}>
        <div className={"window"}>
            <div className={"left"}>
                <div className={"actions"}>
                    <div className={"parameters"}>
                        <div className={"algorithmSelectSection"}>
                            <div className={"algorithmSelectTitle"}>
                                <Text className={"title"} text={"Sorting algorithm:"}/>
                            </div>

                            <SelectControl
                                className={"sorting-algorithm-select"}
                                options={sortingAlgorithms}
                                value={selectedAlgorithm}
                                disabled={sorting}
                                onChange={onSelectedAlgorithmChange}>
                            </SelectControl>
                        </div>

                        <div className={"sampleCountSection"}>
                            <div className={"samplesTitle"}>
                                <Text className={"title"} text={"Number of samples:"}/>
                            </div>
                            <div className={"sliderValueGroup"}>

                                <Slider
                                    handleStyle={{
                                        borderColor: 'transparent',
                                        height: 20,
                                        width: 20,
                                        marginTop: -5,
                                        backgroundColor: '#00aeff',
                                    }}
                                    dotStyle={{
                                        borderColor: 'transparent',
                                        backgroundColor: '#c4c4c4',
                                        marginBottom: -3,
                                    }}
                                    railStyle={{ backgroundColor: '#404040', height: 10 }}
                                    className={"slider"}
                                    marks={marks}
                                    included={false}
                                    value={calcLogPos(sampleCount)}
                                    onChange={onSampleCountSliderChange}
                                    defaultValue={Math.log(250)}/>

                                <div className={"sampleInput"}>
                                    <Input
                                        id="fname"
                                        name="fname"
                                        disabled={false}
                                        value={sampleCount}
                                        active={true}
                                        onChange={onSampleCountInputChange}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"buttonsSection"}>
                        <Button
                            className={"chartButton"}
                            text={"Shuffle"}
                            onClick={() => onShuffleRequest(sampleCount)}
                            disabled={sorting}>
                            <img src={'/images/shuffle_icon.png'} width={12} height={12} alt={""}/>
                        </Button>

                        <Button
                            className={"chartButton playButton"}
                            onClick={onStartPauseButtonPressed}
                            text={getStartButtonText()}
                            disabled={sorted}>
                            <img src={getPlayPauseIcon()} width={12} height={12} alt={""}/>
                        </Button>

                        <Button
                            className={"chartButton stopButton"}
                            onClick={onStopButtonPressed}
                            text={"Stop"}
                            disabled={!sorting || paused}>
                            <img src={'/images/stop_icon.png'} width={12} height={12} alt={""}/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={"chart"}>
                <BarsView samples={sampleCount} maxValue={maxValue} data={data} maxSpacing={maxSpacing}/>
            </div>
        </div>
    </div>;
}

export default SortPage;