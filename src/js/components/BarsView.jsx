import React, {useEffect, useRef, useState, useCallback} from "react";

import {getParentHeight, getParentWidth, useEffectOnTrue} from "util/util.js";

import {
    createBars, createMaterial,
    createOrthoCamera,
    createPlaneGeometry,
    createRenderer,
    createScene,
    enableTransparency,
    removeChildrenFromScene
} from "util/GLUtil.js";

import "componentStyles/BarsView.scss";

let material = createMaterial("#00c4ff", 0.5);
let geometry;

function BarsView(props) {

    const mount = useRef(null);

    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [firstFrameRendered, setFristFrameRendered] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            setHeight(getParentHeight(mount));
            setWidth(getParentWidth(mount));
        };

        let h = getParentHeight(mount);
        let w = getParentWidth(mount);

        setCamera(createOrthoCamera(w, h, -500, 1000, -5));
        setRenderer(createRenderer(w, h, 0x00000));
        setScene(createScene());
        setWidth(w);
        setHeight(h);
        setInitialized(true);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffectOnTrue(initialized, () => {

        enableTransparency(renderer);

        mount.current.appendChild(renderer.domElement);

        let frameId;

        const renderScene = () => {
            renderer.render(scene, camera);
            if (!firstFrameRendered) {
                setFristFrameRendered(true);
            }
        };

        const animate = () => {
            renderScene();
            frameId = window.requestAnimationFrame(animate);
        };

        const dispose = () => {
            cancelAnimationFrame(frameId);
            frameId = null;
            removeChildrenFromScene(scene);
            geometry?.dispose();
            mount.current.removeChild(renderer.domElement);
        };

        const start = () => {
            if (!frameId) {
                requestAnimationFrame(animate);
            }
        };

        start();
        return dispose;
    }, [initialized]);

    useEffectOnTrue(initialized, () => {

        const updateBars = () => {
            for (let i = 0; i < props.samples; i++) {
                scene.children[i].scale.y = (props.data[i] / props.maxValue);
                scene.children[i].position.y = height / 2 - (height * (1.0 - scene.children[i].scale.y)) / 2;
            }
        };

        const createOrUpdateBars = () => {
            if (scene.children.length === 0 || scene.children.length > 0 && scene.children.length !== props.data.length) {
                createBars(scene, material, width, height, props.data, props.maxValue);
            }
            else {
                updateBars();
            }
        };

        createOrUpdateBars();

    }, [props.data]);

    useEffectOnTrue(initialized, () => {

        const updateCamera = () => {
            camera.left = 0;
            camera.right = width;
            camera.top = height;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
        };

        const udpateRenderer = () => {
            renderer.setSize(width, height);
        };

        const updateBars = () => {
            const spacing = 2;
            const barWidth = (width - (props.samples * spacing)) / props.samples;
            const barHeight = height;
            const geom = createPlaneGeometry(barWidth, barHeight);

            for (let i = 0; i < props.samples; i++) {
                const bar = scene.children[i];
                bar.geometry = geom;
                bar.scale.y = (props.data[i] / props.maxValue);
                bar.position.x = barWidth / 2 + barWidth * i + spacing * i;
                bar.position.y = barHeight / 2 - (height * (1.0 - bar.scale.y)) / 2;
            }
        };

        const createOrUpdateBars = () => {
            if (scene.children.length === 0) {
                createBars(scene, material, width, height, props.data, props.maxValue);
            }
            else {
                updateBars();
            }
        };

        updateCamera();
        udpateRenderer();
        createOrUpdateBars();
        renderer.render(scene, camera);
    }, [width, height]);

    const getClassName = useCallback(() => firstFrameRendered ? "visible" : "not_visible", [firstFrameRendered]);

    return <div ref={mount} className={getClassName()}/>;
}

export default BarsView;