import React, {useEffect, useRef, useState, useCallback} from "react";

import {getParentHeight, getParentWidth, useEffectOnTrue, useEffectWithNonNull} from "util/util.js";

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

let material = createMaterial("#00c4ff", 1);
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

    useEffectWithNonNull(() => {
        if (scene.children.length > 0) {
            for (let i = 0; i < props.samples; i++) {
                scene.children[i].material.color.setHex("0x" + props.color.substring(1));
            }
        }
    }, [props.color, scene])

    useEffectOnTrue(initialized, () => {

        const updateCamera = () => {
            camera.left = 0;
            camera.right = width;
            camera.top = height;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
        };

        const updateBars = () => {
            let spacing = props.maxSpacing;
            let barWidth = (width - (spacing * props.samples)) / props.samples;

            while (barWidth < 1 && spacing > 0) {
                spacing -= 1;
                barWidth = (width - (spacing * props.samples)) / props.samples;

                if (barWidth > 1) {
                    break;
                }
            }

            for (let i = 0; i < props.samples; i++) {
                scene.children[i].scale.x = barWidth;
                scene.children[i].scale.y = props.data[i] / props.maxValue * height;
                scene.children[i].position.x = barWidth / 2 + barWidth * i + spacing * i;
                scene.children[i].position.y =  -(1.0 - scene.children[i].scale.y) / 2;
            }
        };

        const createOrUpdateBars = () => {
            if (props.data.length === 0) {
                return;
            }

            if (scene.children.length === 0 || scene.children.length !== props.samples) {
                createBars(scene, material, width, height, props.data, props.maxValue, props.maxSpacing);
            }
            else {
                updateBars();
            }
        };

        updateCamera();
        renderer.setSize(width, height);
        renderer.render(scene, camera);

        createOrUpdateBars();
    }, [props.data, width, height, props.maxSpacing, renderer, camera, scene]);

    const getClassName = useCallback(() => firstFrameRendered ? "visible" : "not_visible", [firstFrameRendered]);

    return <div ref={mount} className={getClassName()}/>;
}

export default BarsView;