import React, {useEffect, useState, useCallback} from 'react';
import BarsView from "components/BarsView";
import Button from "components/Button";
import SelectControl from "components/SelectControl";
import {registerSortWorker, unregisterWorker, sendMessage} from "workers/workers.js";
import {useEffectWithNonNull} from "util/util.js";
import Input from "components/Input";

import "styles/pages/SortPage.scss";

const sortingAlgorithms = ["MergeSort", "BubbleSort", "InsertionSort", "QuickSort"];

const maxValue = 1000;

function SortPage() {

    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [sorting, setSorting] = useState(false);
    const [paused, setPaused] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const [sampleCount, setSampleCount] = useState(200);
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
        let v = e.target.value;
        let targetValue = 1;
        if ((/^([1-9][0-9]{0,3}|10000)$/).test(v)) {
            targetValue = parseInt(v);
            onShuffleRequest(targetValue);
        }
        setSampleCount(v);
    }, [worker]);

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
                                <p className={"title"}>Select sorting algorithm:</p>
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
                                <p className={"title"}>Select number of samples:</p>
                            </div>

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
                <BarsView samples={sampleCount} maxValue={maxValue} data={data}/>
            </div>
        </div>
    </div>;
}

export default SortPage;