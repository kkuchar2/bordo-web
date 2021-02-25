import React, {useEffect, useRef, useState, useCallback} from "react";
import useMouse from '@react-hook/mouse-position';
import {Raycaster} from "three";
import {useEffectOnTrue} from "util/util.js";
import classNames from 'classnames';

import {
    createCells, createLines,
    createMaterial,
    createOrthoCamera,
    createRenderer,
    createScene,
    enableTransparency,
    removeChildrenFromScene,
    updateCamera
} from "util/GLUtil.js";

import "componentStyles/GridView.scss";

const defaultMaterial = createMaterial("#696969", 0.2);
const startPointMaterial = createMaterial("#52ac00", 1);
const endPointMaterial = createMaterial("#ff0000", 1);
const obstacleMaterial = createMaterial("#222222", 1);
const visitedMaterialStart = createMaterial("#81f879", 1);
const visitedMaterialEnd = createMaterial("#175eae", 1);
const pathMaterialStart = createMaterial("#ffffff", 1);
const pathMaterialEnd = createMaterial("#d79f00", 1);
const lineMaterial = createMaterial("#262626", 1);
const highlightMaterial = createMaterial("#9f9f9f", 0.5);

function GridView(props) {

    const mount = useRef(null);
    const frameId = useRef(null);
    const mouseFetcher = useMouse(mount, {enterDelay: 100, leaveDelay: 100, fps: 60});
    const mouseData = useRef({x: -1, y: -1, pressed: false});

    const pageState = useRef({
        movingStart: false,
        movingEnd: false,
        overStart: false,
        overEnd: false,
        startIndex: -1,
        endIndex: -1,
        lastHoveredIndex: -1,
        findingPath: false
    });

    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [raycaster, setRaycaster] = useState(null);
    const [cellsCreated, setCellsCreated] = useState(false);
    const [lineCount, setLineCount] = useState(0);
    const [rect, setRect] = useState(null);
    const pathIndices = useRef([]);
    const visitedIndices = useRef([]);

    const {
        width,
        height,
        cellSize,
        cols,
        rows,
        visited,
        path,
        obstacles,
        startIdx,
        endIdx,
        findingPath,
        onObstaclesSelected,
        onStartChange,
        onEndChange
    } = props;

    useEffect(() => {
        setCamera(createOrthoCamera(width, height, 1, 1000, 0));
        setRenderer(createRenderer(width, height, "#000000"));
        setScene(createScene());
        const raycaster = new Raycaster();
        raycaster.layers.set(1);
        setRaycaster(raycaster);
        setInitialized(true);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mousedown', onMouseDown, false);
        return () => {
            document.addEventListener('mouseup', onMouseUp, false);
            document.addEventListener('mousedown', onMouseDown, false);
        };
    }, []);

    useEffect(() => pageState.current.findingPath = findingPath, [findingPath]);

    useEffect(() => {
        if (!initialized) {
            return;
        }
        enableTransparency(renderer);
        mount.current?.appendChild(renderer.domElement);

        const r = mount.current.getBoundingClientRect();
        setRect(r);

        requestAnimationFrame(renderFrame);
        return () => dispose();
    }, [initialized]);

    useEffect(() => {
        if (mouseFetcher.x === null || mouseFetcher.y === null) {
            return;
        }

        if (mouseFetcher.x < 1 || mouseFetcher.y < 1) {
            resetLastHoveredCell();
            return;
        }

        mouseData.current.x = (mouseFetcher.x / width) * 2 - 1;
        mouseData.current.y = -(mouseFetcher.y / height) * 2 + 1;
    }, [mouseFetcher]);

    useEffect(() => {
        const r = mount.current.getBoundingClientRect();
        setRect(r);
    }, [width, height]);

    useEffectOnTrue(initialized, () => {
        if (cellsCreated) {
            const cellsCount = scene.children.length - lineCount;
            const expectedCellsCount = cols * rows;

            if (expectedCellsCount !== cellsCount) {
                createInitialScene();
            }
            else {
                updateCells();
            }
        }
        else {
            createInitialScene();
        }

        updateCamera(camera, 0, width, height, 0);
        renderer.setSize(width, height);
    }, [obstacles, cols, rows, visited, path, width, height, cellsCreated, lineCount]);

    const createInitialScene = () => {
        removeChildrenFromScene(scene);
        createCells(scene, defaultMaterial, startPointMaterial, endPointMaterial, cellSize, cols, rows, startIdx, endIdx);
        setLineCount(createLines(scene, lineMaterial, cellSize, cols, rows, width, height));
        setCellsCreated(true);
    };

    const dispose = () => {
        cancelAnimationFrame(frameId);
        frameId.current = null;
        removeChildrenFromScene(scene);
    };

    const selectObstacles = useCallback((intersectedChildren) => {
        if (intersectedChildren.length !== 1) {
            return;
        }

        const cell = intersectedChildren[0].object;

        const id = cell.userData.id;
        const isStart = cell.userData.isStart;
        const isEnd = cell.userData.isEnd;
        const isObstacle = cell.userData.isObstacle;

        if (isStart || isEnd || isObstacle) {
            return;
        }

        const circleX = scene.children[id].userData.x;
        const circleY = scene.children[id].userData.y;
        // const indicesToSelect = [id, ...calculateCellsInCircle(circleX, circleY, 1, scene.children)];
        const indicesToSelect = [id];

        onObstaclesSelected(indicesToSelect);

        for (let j = 0; j < indicesToSelect.length; j++) {
            const obj = scene.children[indicesToSelect[j]];

            if (obj.userData.isObstacle) {
                continue;
            }
            obj.userData.isObstacle = true;
            setCellMaterial(obj, obstacleMaterial.clone());
        }
    }, [scene]);

    const detectOverStart = useCallback((intersectedChildren) => {
        if (intersectedChildren.length !== 1) {
            return;
        }

        const cell = intersectedChildren[0].object;
        const actions = pageState.current;
        const userData = cell.userData;
        const isStart = userData.isStart;
        const isEnd = userData.isEnd;

        actions.overStart = isStart;
        actions.overEnd = isEnd;

        if (isStart) {
            actions.startIndex = cell.userData.id;
        }

        if (isEnd) {
            actions.endIndex = cell.userData.id;
        }
    }, [scene]);

    const moveStartCell = useCallback((cell) => {

        const actions = pageState.current;
        const isStart = cell.userData.isStart;
        const isEnd = cell.userData.isEnd;
        const isObstacle = cell.userData.isObstacle;

        if (!isStart && !isObstacle && !isEnd) {
            const nextIndex = cell.userData.id;

            // Disable old cell
            const oldStartCell = scene.children[pageState.current.startIndex];
            setCellMaterial(oldStartCell, defaultMaterial.clone());
            oldStartCell.userData.isStart = false;
            oldStartCell.position.z = -3;

            // Enable new cell
            const newStartCell = scene.children[nextIndex];
            setCellMaterial(newStartCell, startPointMaterial.clone());
            newStartCell.userData.isStart = true;
            newStartCell.position.z = -3;

            actions.startIndex = nextIndex;
            onStartChange(nextIndex);
        }
    });

    const moveEndCell = useCallback((cell) => {
        const actions = pageState.current;
        const isStart = cell.userData.isStart;
        const isEnd = cell.userData.isEnd;
        const isObstacle = cell.userData.isObstacle;

        if (!isStart && !isObstacle && !isEnd) {
            const nextIndex = cell.userData.id;

            // Disable old cell
            const oldEndCell = scene.children[pageState.current.endIndex];
            setCellMaterial(oldEndCell, defaultMaterial.clone());
            oldEndCell.userData.isEnd = false;
            oldEndCell.position.z = -3;

            // Enable new cell
            const newEndCell = scene.children[nextIndex];
            setCellMaterial(newEndCell, endPointMaterial.clone());
            newEndCell.userData.isEnd = true;
            newEndCell.position.z = -3;

            actions.endIndex = nextIndex;
            onEndChange(nextIndex);
        }
    });

    const raycast = useCallback(() => {
        if (pageState.current.findingPath) {
            return;
        }

        const actions = pageState.current;
        const mouseInfo = mouseData.current;

        const movingStart = actions.movingStart;
        const movingEnd = actions.movingEnd;
        const isMouseDown = mouseInfo.pressed;

        if (isMouseDown) {
            for (let i = 0; i < scene.children.length; i++) {
                if (pathIndices.current.includes(i)) {
                    const cell = scene.children[i];
                    cell.userData.isPath = false;
                    setCellMaterial(cell, defaultMaterial.clone());
                }

                if (visitedIndices.current.length > 0) {
                    if (visitedIndices.current.includes(i)) {
                        const cell = scene.children[i];
                        if (!cell.userData.isStart) {
                            setCellMaterial(cell, defaultMaterial.clone());
                        }
                    }
                }
            }
            visitedIndices.current = [];
            pathIndices.current = [];
        }

        raycaster.setFromCamera(mouseInfo, camera);

        const intersectedChildren = raycaster.intersectObjects(scene.children);

        if (intersectedChildren.length !== 1) {
            return;
        }

        if (movingStart) {
            moveStartCell(intersectedChildren[0].object);
        }
        else if (movingEnd) {
            moveEndCell(intersectedChildren[0].object);
        }
        else {
            if (isMouseDown) {
                actions.lastHoveredIndex = -1;
                selectObstacles(intersectedChildren);
            }
            else {

                const cell = intersectedChildren[0].object;
                const cellInfo = cell.userData;

                if (cellInfo.isStart || cellInfo.isEnd) {
                    resetLastHoveredCell();
                }

                if (!cellInfo.isStart && !cellInfo.isEnd && !cellInfo.isObstacle && !cellInfo.isPath) {
                    resetLastHoveredCell();
                    cell.material = highlightMaterial.clone();
                    actions.lastHoveredIndex = cellInfo.id;
                }
                detectOverStart(intersectedChildren);
            }
        }

    }, [camera, findingPath]);

    const resetLastHoveredCell = useCallback(() => {
        const lastHoveredIndex = pageState.current.lastHoveredIndex;
        if (lastHoveredIndex === -1) {
            return;
        }
        scene.children[lastHoveredIndex].material = defaultMaterial.clone();
    }, [scene]);

    const renderFrame = useCallback(() => {
        raycast();
        renderer.render(scene, camera);
        frameId.current = window?.requestAnimationFrame(renderFrame);
    }, [camera]);

    const updateCells = useCallback(() => {
        if (visited !== -1) {
            const cell = scene.children[visited];
            visitedIndices.current.push(visited);

            if (!cell.userData.isStart && !cell.userData.isEnd) {
                cell.material = visitedMaterialEnd.clone();
            }
        }

        if (path.length > 0) {
            const nextPathIndices = [];

            for (let i = 0; i < scene.children.length; i++) {
                const cell = scene.children[i];

                if (pathIndices.current.length === 0 && path.includes(i) && !cell.userData.isStart && !cell.userData.isEnd) {
                    cell.material = pathMaterialEnd.clone();
                    cell.position.z = -3;
                    cell.userData.isPath = true;
                    nextPathIndices.push(i);
                }
            }
            pathIndices.current = nextPathIndices;
        }
    }, [scene, visited, path, pathIndices]);

    const setCellMaterial = (cell, material) => cell.material = material;

    const onMouseDown = useCallback(() => {
        mouseData.current.pressed = true;

        if (pageState.current.overStart && !pageState.current.movingStart) {
            pageState.current.movingStart = true;
        }
        else if (pageState.current.overEnd && !pageState.current.movingEnd) {
            pageState.current.movingEnd = true;
        }
    }, []);

    const onMouseLeave = useCallback(() => {
        mouseData.current.x = -1;
        mouseData.current.y = -1;
    }, []);

    const onMouseUp = useCallback(() => {
        mouseData.current.pressed = false;

        if (pageState.current.movingStart) {
            pageState.current.movingStart = false;
        }
        else if (pageState.current.movingEnd) {
            pageState.current.movingEnd = false;
        }
    }, []);

    const getClassName = useCallback(() => {
        return classNames({
            "gridView": true,
            "isOverStart": pageState.current.overStart,
            "isOverEnd": pageState.current.overEnd
        });
    }, []);

    const getText = () => {
        const overStart = pageState.current.overStart;
        const overEnd = pageState.current.overEnd;
        if (overStart) {
            return "Start point";
        }
        else if (overEnd) {
            return "Goal";
        }

        return "";
    };

    const getFlagClassName = () => {
        return classNames({
            "flag": true,
            "visible": pageState.current.overStart || pageState.current.overEnd
        });
    };

    const getFlagStyle = () => {
        if (rect === null) {
            return {};
        }

        return {top: rect.top - 130 + mouseFetcher.y, left: rect.left + mouseFetcher.x - 25 + 40};
    };

    return <div ref={mount} style={{width: width, height: height}} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown}
                className={getClassName()}>
        <div className={getFlagClassName()}
             style={getFlagStyle()}>
            <div>{getText()}</div>
            <div className={"description"}>Drag and drop to move</div>
        </div>
    </div>;
}

export default GridView;