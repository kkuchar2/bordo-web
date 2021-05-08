import React, {useCallback, useEffect, useRef, useState} from "react";

import {getParentHeight, getParentWidth, useEffectOnTrue, useEffectWithNonNull} from "util/util.js";

import {
    colorOfHash,
    createBars,
    createOrthoCamera,
    createRenderer,
    createScene,
    enableTransparency,
    removeChildrenFromScene,
    calculateBarsSizes,
    updateInstancedBar,
    updateInstancedMeshColor,
    dummyObj
} from "util/GLUtil.js";

import "componentStyles/BarsView.scss";

const barMarkColors = ["#ff0033", "#ff0084", "#00a002", "#ff6600"]

function BarsView(props) {
    const { samples, maxValue, data, maxSpacing, color, marks, algorithm, dirty } = props;

    const mount = useRef(null);

    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            setHeight(getParentHeight(mount));
            setWidth(getParentWidth(mount));
        };

        let h = getParentHeight(mount);
        let w = getParentWidth(mount);

        setCamera(createOrthoCamera(w, h, 0.1, 1000, 5));
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

        return () => {
            removeChildrenFromScene(scene);
            mount.current.removeChild(renderer.domElement);
        };
    }, [initialized]);

    useEffectWithNonNull(() => updateBarsColor(), [data, color, scene])

    const updateBarsColor = useCallback(() => {
        if (scene.children.length > 0) {
            updateInstancedMeshColor(scene.children[0], data.length, color);
        }
    }, [scene, data, color])

    useEffectOnTrue(initialized, () => {

        const updateCamera = () => {
            camera.left = 0;
            camera.right = width;
            camera.top = height;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
        };

        const updateBars = () => {
            if (scene.children.length === 0) {
                return;
            }

            const mesh = scene.children[0];

            const {barWidth, spacing, offsetX} = calculateBarsSizes(width, data.length);

            for (let x = 0; x < samples; x++) {

                updateInstancedBar(x, mesh, data[x], maxValue, height, barWidth, spacing, offsetX, color);

                for (const mark of marks) {
                    if (mark.idx === x) {
                        mesh.setColorAt(x, colorOfHash(barMarkColors[mark.color]));
                        break;
                    }
                }

                mesh.setMatrixAt(x, dummyObj.matrix);
            }

            mesh.instanceMatrix.needsUpdate = true;
            mesh.instanceColor.needsUpdate = true;
        }

        const createOrUpdateBars = () => {
            if (data.length === 0) {
                return;
            }

            if (dirty) {
                createBars(scene, width, height, data, maxValue, color);
            }
            else {
                updateBars();
            }
        };

        updateCamera();
        createOrUpdateBars();
        renderer.setSize(width, height);
        renderer.render(scene, camera);
    }, [algorithm, dirty, data, width, height, maxSpacing, color, marks]);

    return <div ref={mount} className={"visible"}/>;
}

export default BarsView;