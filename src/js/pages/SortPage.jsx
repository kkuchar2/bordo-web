import React, {useEffect, useState, useCallback} from 'react';
import BarsView from "components/BarsView";
import Button from "components/Button";
import SliderWithInput from "components/SliderWithInput";
import SelectControl from "components/SelectControl";
import Text from "components/Text.jsx";
import {HexColorPicker} from "react-colorful";

import {registerSortWorker, unregisterWorker, sendMessage} from "workers/workers.js";
import {logPosition, logSlider, useEffectWithNonNull} from "util/util.js";
import validator from 'validator';

const sortingAlgorithms = ["MergeSort", "BubbleSort", "InsertionSort", "QuickSort"];

const minSampleCount = 10;
const maxSampleCount = 300;

const minSlowdownFactor = 1;
const maxSlowdownFactor = 60;

const createSliderMarks = (min, max) => {
    const marks = {};
    marks[logPosition(min, min, max)] = <p>{min}</p>;
    marks[logPosition(max / 2, min, max)] = <p>{max / 2}</p>;
    marks[logPosition(max / 4, min, max)] = <p>{max / 4}</p>;
    marks[logPosition(max / 6, min, max)] = <p>{max / 6}</p>;
    marks[logPosition(max, min, max)] = {
        style: {
            color: '#00b0ff',
        },
        label: <p>{max}</p>,
    };
    return marks;
}

const sampleCountMarks = createSliderMarks(minSampleCount, maxSampleCount);
const slowdownFactorMarks = createSliderMarks(minSlowdownFactor, maxSlowdownFactor);

import "styles/pages/SortPage.scss";

function SortPage() {

    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [sorting, setSorting] = useState(false);
    const [paused, setPaused] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const [sampleCount, setSampleCount] = useState(100);
    const [maxSpacing, setMaxSpacing] = useState(1);
    const [slowdownFactor, setSlowdownFactor] = useState(minSlowdownFactor);
    const [worker, setWorker] = useState(null);
    const [color, setColor] = useState("#714bb1");
    const [dirty, setDirty] = useState(false);
    const [marks, setMarks] = useState([]);

    const messageHandlersMap = {
        "sort": payload => {
            setData(payload.data)
            setMarks(payload.marks)
        },
        "shuffle": payload => onShuffleDataReceived(payload),
        "sortFinished": payload => onSortFinished(payload.sorted),
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
        setDirty(true);
    }, []);

    const onSortFinished = useCallback(isSorted => {
        setSorting(false);
        setSorted(isSorted);
    }, []);

    const onStartPauseButtonPressed = useCallback(() => {
        setDirty(false);

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
        sendMessage(worker, "shuffle", {sampleCount: samples, maxValue: maxSampleCount});
    }, [worker]);

    const onSlowdownFactorChange = useCallback((e) => {
        const value = validator.toInt(e.target.value);

        if (value >= 1 && value <= 50) {
            setSlowdownFactor(value)
        }
    }, []);

    const onSampleCountInputChange = useCallback(e => {
        const value = validator.toInt(e.target.value);

        if (value >= 1 && value <= maxSampleCount) {
            setSampleCount(value)
        }
    }, []);

    useEffectWithNonNull(() => onShuffleRequest(sampleCount), [sampleCount, worker])

    useEffectWithNonNull(() => {
        sendMessage(worker, "setSlowdownFactor", {value: slowdownFactor});
    }, [slowdownFactor, worker])

    const onSampleCountSliderChange = useCallback(v => {
        setSampleCount(Math.ceil(logSlider(v, minSampleCount, maxSampleCount)))
    }, [worker]);

    const onSlowdownFactorSliderChange = useCallback(v => setSlowdownFactor(v * (maxSlowdownFactor / 100)), [worker]);

    const getPlayPauseIcon = useCallback(() => {
        return !sorting || paused ? 'images/play_icon.png' : 'images/pause_icon.png';
    }, [sorting, paused]);

    const getStartButtonText = useCallback(() => {
        return !sorting || paused ? "Sort" : "Pause";
    }, [sorting, paused])

    const onSelectedAlgorithmChange = useCallback(setSelectedAlgorithm, []);

    return <div className={"sortPage"}>
        <div className={"window"}>
            <div className={"toolbar"}>
                <Text className="sortTitle" text={"Sorting algorithms visualizer"}/>

                <Text className="sortDescription"
                      text={"Tool that displays visualisation of common sorting algorithms"}/>

                <Text className="sortDescription"
                      text={"Algorithms code is placed and running on worker thread, while notifying UI components in real time"}/>

                <div className={"algorithmSelectSection"}>
                    <div className={"algorithmSelectTitle"}>
                        <Text disabled={sorting} className={"title"} text={"Sorting algorithm:"}/>
                    </div>

                    <SelectControl
                        className={"sorting-algorithm-select"}
                        options={sortingAlgorithms}
                        value={selectedAlgorithm}
                        disabled={sorting}
                        onChange={onSelectedAlgorithmChange}>
                    </SelectControl>
                </div>

                <SliderWithInput
                    text={"Number of samples:"}
                    description={"Number of samples that will be sorted and visualized"}
                    logharitmic={true}
                    marks={sampleCountMarks}
                    value={sampleCount}
                    min={minSampleCount}
                    max={maxSampleCount}
                    disabled={sorting}
                    onSliderChange={onSampleCountSliderChange}
                    onInputChange={onSampleCountInputChange}>
                </SliderWithInput>

                <SliderWithInput
                    text={"Slowdown factor [ms]:"}
                    description={"Delay of miliseconds to wait before each visual state to update (less = faster)"}
                    logharitmic={false}
                    marks={slowdownFactorMarks}
                    value={slowdownFactor}
                    min={minSlowdownFactor}
                    max={maxSlowdownFactor}
                    onSliderChange={onSlowdownFactorSliderChange}
                    onInputChange={onSlowdownFactorChange}>
                </SliderWithInput>

                <Text className={"title"} text={"Bars color:"}/>

                <HexColorPicker color={color} onChange={setColor}/>

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


            <div className={"chart"}>
                <BarsView
                    samples={sampleCount}
                    maxValue={maxSampleCount}
                    data={data}
                    maxSpacing={maxSpacing}
                    color={color}
                    marks={marks}
                    algorithm={selectedAlgorithm}
                    dirty={dirty}/>
            </div>

        </div>
    </div>;
}

export default SortPage;