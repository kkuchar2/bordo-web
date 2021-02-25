import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

import {onMousePress, onMouseRelease} from "redux/reducers/application";
import {registerPathfindingWorker, sendMessage, unregisterWorker} from "workers/workers.js";
import Button from "components/Button";
import GridView from "components/GridView.jsx";
import {getParentHeight, getParentWidth, useEffectWithNonNull} from "util/util.js";

import "styles/pages/PathfindingPage.scss";

const pathfindingAlgorithms = ["aStar"];

function PathfindingPage() {

    const mount = useRef(null);

    const [obstacles, setObstacles] = useState([]);

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [gridWith, setGridWidth] = useState(0);
    const [gridHeight, setGridHeight] = useState(0);
    const [cellSize, setCellSize] = useState(25);
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
        "onPathDataInit": payload => onPathDataInit(payload),
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
        const columnCount = Math.floor((width - 100) / cellSize);
        const rowCount = Math.floor((height - 150) / cellSize);
        const newGridWidth = columnCount * cellSize;
        const newGridHeight = rowCount * cellSize;
        setGridWidth(newGridWidth);
        setGridHeight(newGridHeight);
        setCols(columnCount);
        setRows(rowCount);
        sendMessage(worker, "initData", {
            "rows": rowCount,
            "cols": columnCount,
            "startIndex" : startIndex,
            "endIndex" : endIndex
        });
        setStartIndex(0);
        setEndIndex(1);
    }, [width, height, worker]);

    const onPathFindUpdate = useCallback(payload => setVisited(payload.visited), []);

    const onPathDataInit = useCallback(payload => setData(payload.data), []);

    const onObstacleDataReceived = useCallback(payload => setObstacles(payload.obstacles), []);

    const onFindPathButtonPressed = useCallback(() => {
        if (foundPath) {
            return;
        }

        if (findingPath) {
            sendMessage(worker, "pause", {});
        }
        else {
            setFindingPath(true);

            sendMessage(worker, "selectCells", {indices: obstacles});
            sendMessage(worker, "findPath", {algorithm: pathfindingAlgorithms[selectedAlgorithm]});
        }
    }, [worker, foundPath, obstacles]);

    const onPathFindingFinished = useCallback((payload) => {
        setPath(payload.path);
        setFindingPath(false);
        setFoundPath(payload.foundPath);
        setData(payload.data);
        setVisited(payload.visited);
    }, []);

    const onStopButtonPressed = useCallback(() => sendMessage(worker, "stop"), [worker]);

    const onClearButtonPressed = useCallback(() => {
        setObstacles([]);
        sendMessage(worker, "clearBoard");
    }, [worker]);

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

    const onCellsSelected = useCallback(indices => setObstacles(obstacles => [...obstacles, ...indices]), [obstacles]);

    const onStartChange = useCallback(setStartIndex, [worker]);

    const onEndChange = useCallback(setEndIndex, [worker]);

    useEffectWithNonNull(() => sendMessage(worker, "setStart", {id: startIndex}), [startIndex, worker]);

    useEffectWithNonNull(() => sendMessage(worker, "setEnd", {id: endIndex}), [endIndex, worker]);

    const onEraserToggled = useCallback(v => {}, [worker]);

    return <div ref={mount} className={"PathfindingPage"} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
        <div className={"buttonsSection"}>
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
        <GridView
            width={gridWith}
            height={gridHeight}
            onCellsSelected={onCellsSelected}
            cellSize={cellSize}
            cols={cols}
            rows={rows}
            data={data}
            visited={visited}
            path={path}
            obstacles={obstacles}
            onStartChange={onStartChange}
            onEndChange={onEndChange}
            startIdx={startIndex}
            endIdx={endIndex} />
    </div>;
}

export default PathfindingPage;