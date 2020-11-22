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

import "componentStyles/BarsView.scss"

let material1 = createMaterial( 0x00eeff, 0.3);
let material2 = createMaterial(0x00eeff, 0.4);
let geometry;

export default props => {

    const mount = useRef(null);

    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [firstFrameRendered, setFristFrameRendered] = useState(false);

    useEffect(() => {
        setCamera(createOrthoCamera(props.width, props.height, -500, 1000, -5));
        setRenderer(createRenderer(props.width, props.height, '#1c1c1c'));
        setScene(createScene());
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (!initialized) return;

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

    useEffect(() => {
        if (!initialized) return;

        function updateBars() {
            for (let i = 0; i < props.samples; i++) {
                scene.children[i].scale.y = props.data[i] / props.maxValue;
            }
        }

        function createOrUpdateBars() {
            if (scene.children.length === 0) {
                createBars(scene, material1, material2, props.width, props.height, props.data, props.maxValue);
            }
            else {
                updateBars();
            }
        }

        createOrUpdateBars();

    }, [props.data])

    useEffect(() => {
        if (!initialized) return;

        function updateCamera() {
            camera.left = 0;
            camera.right = props.width;
            camera.top = props.height;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
        }

        function udpateRenderer() {
            renderer.setSize(props.width, props.height);
        }

        function updateBars() {
            let barWidth = props.width / props.samples;
            let barHeight = props.height;
            let geometry = createPlaneGeometry(barWidth, barHeight);

            for (let i = 0; i < props.samples; i++) {
                const bar = scene.children[i];
                bar.geometry = geometry;
                bar.scale.y = props.data[i] / props.maxValue;
                bar.position.x =  barWidth / 2 + barWidth * i;
                bar.position.y = barHeight / 2;
            }
        }

        function createOrUpdateBars() {
            if (scene.children.length === 0) {
                createBars(scene, material1, material2, props.width, props.height, props.data, props.maxValue);
            }
            else {
                updateBars();
            }
        }

        updateCamera();
        udpateRenderer();
        createOrUpdateBars();
    }, [props.width, props.height]);

    function getClassName() {
        return firstFrameRendered ? "visible" : "not_visible"
    }

    return <div ref={mount} className={getClassName()}/>
}