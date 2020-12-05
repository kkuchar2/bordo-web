import React, {useEffect, useRef, useState} from "react";

import {
    createMaterial,
    createOrthoCamera,
    createRenderer,
    createBars,
    enableTransparency,
    createPlaneGeometry,
    createScene,
    removeChildrenFromScene
} from "util/GLUtil.jsx";

import {useEffectOnTrue, getParentHeight, getParentWidth} from "util/Util.jsx";

import "componentStyles/BarsView.scss"

let material1 = createMaterial(0x00eeff, 0.3);
let material2 = createMaterial(0x00eeff, 0.4);
let geometry;

export default props => {

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
        }

        let h = getParentHeight(mount);
        let w = getParentWidth(mount);

        console.log(w + " " + h);

        setCamera(createOrthoCamera(w, h, -500, 1000, -5));
        setRenderer(createRenderer(w, h, '#1c1c1c'));
        setScene(createScene());
        setWidth(w);
        setHeight(h);
        setInitialized(true);
        window.addEventListener('resize', updateSize);
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
        }

        const animate = () => {
            renderScene();
            frameId = window.requestAnimationFrame(animate)
        }

        const dispose = () => {
            cancelAnimationFrame(frameId);
            frameId = null;
            removeChildrenFromScene(scene);
            geometry?.dispose();
            mount.current.removeChild(renderer.domElement);
        }

        const start = () => {
            if (!frameId) {
                requestAnimationFrame(animate);
            }
        }

        start();
        return () => {
            dispose();
        }
    }, [initialized]);

    useEffectOnTrue(initialized, () => {

        const updateBars = () => {

            for (let i = 0; i < props.samples; i++) {
                scene.children[i].scale.y = props.data[i] / props.maxValue;
            }
        }

        const createOrUpdateBars = () => {
            if (scene.children.length === 0) {
                createBars(scene, material1, material2, width, height, props.data, props.maxValue);
            }
            else {
                updateBars();
            }
        }

        createOrUpdateBars();

    }, [props.data])

    useEffectOnTrue(initialized, () => {

        const updateCamera = () => {
            camera.left = 0;
            camera.right = width;
            camera.top = height;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
        }

        const udpateRenderer = () => {
            renderer.setSize(width, height);
        }

        const updateBars = () => {
            let barWidth = width / props.samples;
            let barHeight = height;
            let geometry = createPlaneGeometry(barWidth, barHeight);

            for (let i = 0; i < props.samples; i++) {
                const bar = scene.children[i];
                bar.geometry = geometry;
                bar.scale.y = props.data[i] / props.maxValue;
                bar.position.x = barWidth / 2 + barWidth * i;
                bar.position.y = barHeight / 2;
            }
        }

        const createOrUpdateBars = () => {
            if (scene.children.length === 0) {
                createBars(scene, material1, material2, width, height, props.data, props.maxValue);
            }
            else {
                updateBars();
            }
        }

        updateCamera();
        udpateRenderer();
        createOrUpdateBars();
        renderer.render(scene, camera);
    }, [width, height]);

    const getClassName = () => firstFrameRendered ? "visible" : "not_visible";

    return <div ref={mount} className={getClassName()}/>
}