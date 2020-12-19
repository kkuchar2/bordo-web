import React, {useEffect, useState} from 'react';
import BarsView from "components/BarsView.jsx";
import Button from "components/Button.jsx";
import SelectControl from "components/SelectControl.jsx";
import {registerSortWorker, unregister} from "workers/workers.js";
import {useEffectWithNonNull} from "util/util.js";

import "styles/pages/SortPage.scss"

const sortingAlgorithms = ["MergeSort", "BubbleSort", "InsertionSort", "QuickSort"];

export default () => {

    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [sorting, setSorting] = useState(false);
    const [paused, setPaused] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const [sampleCount, setSampleCount] = useState(200);
    const [worker, setWorker] = useState(0);
    const [maxValue, setMaxValue] = useState(10000);

    useEffect(() => {

        const messageHandlersMap = {
            "sort": payload => setData(payload),
            "shuffle": payload => onShuffleDataReceived(payload),
            "sortFinished": payload => onSortFinished(payload.sorted)
        };

        const onMessageReceived = e => messageHandlersMap[e.data.type](e.data.payload);

        const onShuffleDataReceived = data => {
            setData(data);
            setSorted(false);
        }

        const onSortFinished = isSorted => {
            setSorting(false);
            setSorted(isSorted);
        }

        setWorker(registerSortWorker(onMessageReceived));

        return () => unregister(worker);
    }, [])

    useEffectWithNonNull(() => {
        onShuffleRequest(sampleCount);
    }, [worker])

    const onSortButtonPressed = () => {
        if (sorted) {
            return;
        }

        if (sorting) {
            onPauseRequest()
        }
        else {
            setSorting(true);
            sendMessage("sort", {algorithm_type: sortingAlgorithms[selectedAlgorithm]});
        }
    }

    const onStopButtonPressed = () => sendMessage("stop");

    const onPauseRequest = () => {
        setPaused(!paused)
        sendMessage("pause");
    }

    const onShuffleRequest = sampleCount => {
        setSorting(false);
        sendMessage("shuffle", {sampleCount: sampleCount, maxValue: maxValue});
    }

    const sendMessage = (type, payload = []) => worker.postMessage({type: type, payload: payload});

    const onSampleCountInputChange = e => {
        let v = e.target.value;
        let targetValue = 1;
        if (/^([1-9][0-9]{0,3}|10000)$/.test(v)) {
            targetValue = parseInt(v);
            onShuffleRequest(targetValue);
        }
        setSampleCount(v);
    };

    const getPlayPauseIcon = () => {
        if (!sorting || paused) {
            return 'images/play_icon.png';
        }
        else {
            return 'images/pause_icon.png';
        }
    }

    const getSortText = () => {
        if (!paused && sorting) {
            return 'Pause';
        }
        else if (paused && sorting) {
            return 'Resume';
        }
        else if (!sorting) {
            return 'Sort';
        }
    }

    const getSpinnerClassName = () => {
        if (sorting && !paused) {
            return "loader-visible"
        }
        return "loader-hidden";
    }

    return <div className={"sortPage"}>
        <div className={"left"}>
            <div className={"actions"}>

                <SelectControl
                    className={"sorting-algorithm-select"}
                    options={sortingAlgorithms}
                    value={selectedAlgorithm}
                    disabled={sorting}
                    onChange={setSelectedAlgorithm}>
                </SelectControl>

                {/*<div className={"sampleCountSection"}>*/}
                {/*    <div className={"samplesTitle"}>*/}
                {/*        <p className={"title"}>Samples:</p>*/}
                {/*    </div>*/}

                {/*    <div className={"input-field"}>*/}
                {/*        <Input*/}
                {/*            id="fname"*/}
                {/*            name="fname"*/}
                {/*            disabled={false}*/}
                {/*            value={sampleCount}*/}
                {/*            active={true}*/}
                {/*            onChange={onSampleCountInputChange}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={"buttonsSection"}>
                    <Button
                        className={"chartButton"}
                        onClick={() => onShuffleRequest(sampleCount)}
                        disabled={sorting}>
                        <img src={'/images/shuffle_icon.png'} width={12} height={12} alt={""}/>
                    </Button>

                    <Button
                        className={"chartButton playButton"}
                        onClick={onSortButtonPressed}
                        disabled={sorted}>
                        <img src={getPlayPauseIcon()} width={12} height={12} alt={""}/>
                    </Button>

                    <Button
                        className={"chartButton stopButton"}
                        onClick={onStopButtonPressed}
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
}