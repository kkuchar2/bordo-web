import React, {useEffect, useRef, useState, useCallback} from "react";
import useMouse from '@react-hook/mouse-position';
import TWEEN from "@tweenjs/tween.js";
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
    tweenMaterial, tweenScale, updateCamera
} from "util/GLUtil.js";

import "componentStyles/GridView.scss";

const defaultMaterial = createMaterial("#404040", 0.2);
const startPointMaterial = createMaterial("#59ff00", 1);
const endPointMaterial = createMaterial("#ff0000", 1);
const obstacleMaterial = createMaterial("#3996ff", 1);
const visitedMaterialStart = createMaterial("#fff100", 1);
const visitedMaterialEnd = createMaterial("#222222", 1);
const pathMaterialStart = createMaterial("#ff00f2", 1);
const pathMaterialEnd = createMaterial("#d4d4d4", 1);
const lineMaterial = createMaterial("#5f5f5f", 1);

function GridView(props) {

    const mount = useRef(null);
    const frameId = useRef(null);
    const mouseFetcher = useMouse(mount, {enterDelay: 100, leaveDelay: 100, fps: 60});
    const mouseData = useRef({x: -1, y: -1, pressed: false});

    const userActions = useRef({
        movingStart: false,
        movingEnd: false,
        overStart: false,
        overEnd: false,
        startIndex: -1,
        endIndex: -1,
    });

    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [raycaster, setRaycaster] = useState(null);
    const [cellsCreated, setCellsCreated] = useState(false);
    const [lineCount, setLineCount] = useState(0);

    const { width, height, onCellsSelected, cellSize, cols, rows, data, visited, path, obstacles, onStartChange, onEndChange, startIdx, endIdx } = props;

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

    useEffect(() => {
        if (!initialized) {
            return;
        }
        enableTransparency(renderer);
        mount.current?.appendChild(renderer.domElement);
        requestAnimationFrame(renderFrame);
        return () => dispose();
    }, [initialized]);

    useEffect(() => {
        if (mouseFetcher.x === null || mouseFetcher.y === null) {
            return;
        }

        if (mouseFetcher.x < 1 || mouseFetcher.y  < 1) {
            return;
        }

        mouseData.current.x = (mouseFetcher.x / width) * 2 - 1;
        mouseData.current.y = -(mouseFetcher.y / height) * 2 + 1;
    }, [mouseFetcher]);

    useEffectOnTrue(initialized, () => {

        if (data.length === 0) {
            return;
        }

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
    }, [obstacles, cols, rows, data, visited, path, width, height, cellsCreated, lineCount]);

    const createInitialScene = () => {
        console.log("Creating initial scene");
        removeChildrenFromScene(scene);
        createCells(scene, defaultMaterial, startPointMaterial, endPointMaterial, cellSize, cols, rows, data, startIdx, endIdx);
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

        onCellsSelected(indicesToSelect);

        for (let j = 0; j < indicesToSelect.length; j++) {
            const obj = scene.children[indicesToSelect[j]];

            if (obj.userData.isObstacle) {
                continue;
            }
            obj.userData.isObstacle = true;
            obj.material = obstacleMaterial.clone();
        }
    }, [scene]);

    const detectOverStart = useCallback((intersectedChildren) => {
        if (intersectedChildren.length !== 1) {
            return;
        }

        const cell = intersectedChildren[0].object;
        const actions = userActions.current;
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

        const actions = userActions.current;
        const isStart = cell.userData.isStart;
        const isEnd = cell.userData.isEnd;
        const isObstacle = cell.userData.isObstacle;

        if (!isStart && !isObstacle && !isEnd) {
            const nextIndex = cell.userData.id;

            // Disable old cell
            const oldStartCell = scene.children[userActions.current.startIndex];
            oldStartCell.material = defaultMaterial.clone();
            oldStartCell.userData.isStart = false;
            oldStartCell.position.z = -3;

            // Enable new cell
            const newStartCell = scene.children[nextIndex];
            newStartCell.material = startPointMaterial.clone();
            newStartCell.userData.isStart = true;
            newStartCell.position.z = -3;

            actions.startIndex = nextIndex;
            onStartChange(nextIndex);
        }
    });

    const moveEndCell = useCallback((cell) => {
        const actions = userActions.current;
        const isStart = cell.userData.isStart;
        const isEnd = cell.userData.isEnd;
        const isObstacle = cell.userData.isObstacle;

        if (!isStart && !isObstacle && !isEnd) {
            const nextIndex = cell.userData.id;

            // Disable old cell
            const oldEndCell = scene.children[userActions.current.endIndex];
            oldEndCell.material = defaultMaterial.clone();
            oldEndCell.userData.isEnd = false;
            oldEndCell.position.z = -3;

            // Enable new cell
            const newEndCell = scene.children[nextIndex];
            newEndCell.material = endPointMaterial.clone();
            newEndCell.userData.isEnd = true;
            newEndCell.position.z = -3;

            actions.endIndex = nextIndex;
            onEndChange(nextIndex);
        }
    });

    const raycast = useCallback(() => {
        const actions = userActions.current;
        const mouseInfo = mouseData.current;

        const movingStart = actions.movingStart;
        const movingEnd = actions.movingEnd;
        const isMouseDown = mouseInfo.pressed;

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
                selectObstacles(intersectedChildren);
            }
            else {
                detectOverStart(intersectedChildren);
            }
        }

    }, [camera]);

    const renderFrame = useCallback(() => {
        raycast();
        renderer.render(scene, camera);
        TWEEN.update();
        frameId.current = window?.requestAnimationFrame(renderFrame);
    }, [camera]);

    const updateCells = useCallback(() => {

        if (visited === -1) {
            return;
        }

        if (path === undefined) {
            return;
        }

        const cell = scene.children[visited];

        if (!cell.userData.isStart && !cell.userData.isEnd) {
            tweenScale(cell, 200);
            tweenMaterial(cell, visitedMaterialStart, 200, () => tweenMaterial(cell, visitedMaterialEnd, 200));
        }

        for (let i = 0; i < scene.children.length; i++) {
            const cell = scene.children[i];

            if (path.includes(i) && !cell.userData.isStart && !cell.userData.isEnd) {
                tweenScale(cell, 600);
                tweenMaterial(cell, pathMaterialStart, 600, () => tweenMaterial(cell, pathMaterialEnd, 600));
                cell.position.z = -3;
            }
        }

    }, [scene, visited, path]);

    const onMouseDown = useCallback(() => {
        mouseData.current.pressed = true;

        if (userActions.current.overStart && !userActions.current.movingStart) {
            userActions.current.movingStart = true;
        }
        else if (userActions.current.overEnd && !userActions.current.movingEnd) {
            userActions.current.movingEnd = true;
        }
    }, []);

    const onMouseLeave = useCallback(() => {
        mouseData.current.x = -1;
        mouseData.current.y = -1;
    }, []);

    const onMouseUp = useCallback(() => {
        mouseData.current.pressed = false;

        if (userActions.current.movingStart) {
            userActions.current.movingStart = false;
        }
        else if (userActions.current.movingEnd) {
            userActions.current.movingEnd = false;
        }
    }, []);

    const getClassName = useCallback(() => {
        return classNames({
            "gridView": true,
            "isOverStart": userActions.current.overStart,
            "isOverEnd": userActions.current.overEnd
        });
    }, []);

    return <div ref={mount} style={{width: width, height: height}} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} className={getClassName()}/>;
}

export default GridView;