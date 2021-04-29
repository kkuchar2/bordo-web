import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

import {onMousePress, onMouseRelease} from "redux/reducers/application";
import {registerPathfindingWorker, sendMessage, unregisterWorker} from "workers/workers.js";
import Button from "components/Button";
import GridView from "components/GridView.jsx";
import {getParentHeight, getParentWidth, useEffectWithNonNull} from "util/util.js";

import "styles/pages/PathfindingPage.scss";

const pathfindingAlgorithms = ["aStar"];

const cellSize = 25;

function PathfindingPage() {

    const mount = useRef(null);

    const [obstacles, setObstacles] = useState([]);

    const dispatch = useDispatch();
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [gridWith, setGridWidth] = useState(0);
    const [gridHeight, setGridHeight] = useState(0);
    const [visited, setVisited] = useState(-1);

    const [path, setPath] = useState([]);
    const [worker, setWorker] = useState(0);
    const [foundPath, setFoundPath] = useState(false);
    const [findingPath, setFindingPath] = useState(false);
    const [paused, setPaused] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(2);

    const messageHandlersMap = {
        "onPathFindUpdate": payload => onPathFindUpdate(payload),
        "onObstacleDataReceived": payload => onObstacleDataReceived(payload),
        "pathfindingFinished": payload => onPathFindingFinished(payload)
    };

    useEffect(() => {
        setWorker(registerPathfindingWorker(e => messageHandlersMap[e.data.type](e.data.payload)));

        const updateSize = () => {
            setWidth(getParentWidth(mount));
            setHeight(getParentHeight(mount));
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
            unregisterWorker(worker);
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    useEffectWithNonNull(() => {
        if (findingPath) {
            return;
        }
        const columnCount = Math.floor((width / 2 - 100) / cellSize);
        const rowCount = Math.floor((height - 100) / cellSize);
        const newGridWidth = columnCount * cellSize;
        const newGridHeight = rowCount * cellSize;
        setGridWidth(newGridWidth);
        setGridHeight(newGridHeight);
        setCols(columnCount);
        setRows(rowCount);
        sendMessage(worker, "initData", {
            "rows": rowCount,
            "cols": columnCount,
            "startIndex": startIndex,
            "endIndex": endIndex
        });
        setStartIndex(0);
        setEndIndex(1);
    }, [width, height, worker]);

    const onPathFindUpdate = useCallback(payload => setVisited(payload.visited), []);

    const onObstacleDataReceived = useCallback(payload => setObstacles(payload.obstacles), []);

    const onFindPathButtonPressed = useCallback(() => {
        if (foundPath) {
            return;
        }

        if (findingPath) {
            setPaused(true);
            sendMessage(worker, "pause", {});
        }
        else {
            setPaused(false);
            setFindingPath(true);
            setPath([]);

            sendMessage(worker, "selectCells", {indices: obstacles});
            sendMessage(worker, "findPath", {algorithm: pathfindingAlgorithms[selectedAlgorithm]});
        }
    }, [worker, foundPath, obstacles, findingPath]);

    const onPathFindingFinished = useCallback((payload) => {
        setPath(payload.path);
        setFindingPath(false);
        setFoundPath(payload.foundPath);
        setVisited(payload.visited);
        setVisited(-1);
    }, []);

    const onStopButtonPressed = useCallback(() => sendMessage(worker, "stop"), [worker]);

    const onClearButtonPressed = useCallback(() => {
        setObstacles([]);
        sendMessage(worker, "clearBoard");
    }, [worker]);

    const onEraserToggled = useCallback(v => {}, [worker]);

    const getPlayPauseIcon = useCallback(() => {
        if (!findingPath || paused) {
            return 'images/play_icon.png';
        }
        else {
            return 'images/pause_icon.png';
        }
    }, [findingPath, paused]);

    const onMouseUp = useCallback((e) => {
        e.preventDefault();
        dispatch(onMouseRelease());
    }, []);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        dispatch(onMousePress());
    }, []);

    const onObstaclesSelected = useCallback(indices => {
        setObstacles(obstacles => [...obstacles, ...indices]);
        setPath([]);
    }, [obstacles]);

    const onStartChange = useCallback(idx => {
        setStartIndex(idx);
        setPath([]);
    }, [worker]);

    const onEndChange = useCallback(idx => {
        setEndIndex(idx);
        setPath([]);
    }, [worker]);

    useEffectWithNonNull(() => sendMessage(worker, "setStart", {id: startIndex}), [startIndex, worker]);

    useEffectWithNonNull(() => sendMessage(worker, "setEnd", {id: endIndex}), [endIndex, worker]);

    return <div ref={mount} className={"PathfindingPage"} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>

        <div className={"grid"}>
            <GridView
                width={gridWith}
                height={gridHeight}
                cellSize={cellSize}
                cols={cols}
                rows={rows}
                visited={visited}
                path={path}
                obstacles={obstacles}
                startIdx={startIndex}
                endIdx={endIndex}
                findingPath={findingPath}
                onObstaclesSelected={onObstaclesSelected}
                onStartChange={onStartChange}
                onEndChange={onEndChange}/>
        </div>
        <div className={"controlPanel"}>
            <Button
                className={"playButton"}
                onClick={onFindPathButtonPressed}
                disabled={foundPath}>
                <img src={getPlayPauseIcon()} width={12} height={12} alt={""}/>
            </Button>

            {/*<Button*/}
            {/*    className={"stopButton"}*/}
            {/*    onClick={onStopButtonPressed}>*/}
            {/*    <img src={'/images/stop_icon.png'} width={12} height={12} alt={""}/>*/}
            {/*</Button>*/}

            {/*<Button*/}
            {/*    className={"clearButton"}*/}
            {/*    onClick={onClearButtonPressed}*/}
            {/*    disabled={findingPath}>*/}
            {/*    <img src={'/images/clear_icon.png'} width={24} height={24} alt={""}/>*/}
            {/*</Button>*/}

            {/*<ToggleButton*/}
            {/*    className={"clearButton"}*/}
            {/*    onToggle={onEraserToggled}*/}
            {/*    disabled={findingPath}>*/}
            {/*    <img src={'/images/clear_icon.png'} width={24} height={24} alt={""}/>*/}
            {/*</ToggleButton>*/}
        </div>
    </div>;
}

export default PathfindingPage;