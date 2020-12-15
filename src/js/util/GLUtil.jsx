import {Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer} from "three";

import {fragmentShader, vertexShader} from "shaders/shaders.js";

export const createMaterial = (color, alpha) => {
    return new ShaderMaterial({
        uniforms: {
            color: {value: new Color(color)},
            alpha: {value: alpha}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: false
    });
}

export const createOrthoCamera = (width, height, near, far, z) => {
    let camera = new OrthographicCamera(0, width, height, 0, near, far);
    camera.left = 0;
    camera.right = width;
    camera.top = height;
    camera.bottom = 0;
    camera.position.z = z;
    camera.updateProjectionMatrix();
    return camera;
}

export const createRenderer = (width, height, clearColor) => {
    let renderer = new WebGLRenderer( {alpha: true});
    renderer.setClearColor(clearColor, 0);
    renderer.setSize(width, height);
    return renderer;
}

export const enableTransparency = renderer => {
    const gl = renderer.getContext();
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

export const removeChildrenFromScene = scene => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

export const createPlaneGeometry = (width, height) => {
    return new PlaneGeometry(width, height, 1);
}

export const createScene = () => new Scene();

export const createBars = (scene, material1, material2, width, height, data, maxValue) => {
    removeChildrenFromScene(scene);

    let barWidth = width / data.length;
    let barHeight = height;

    let geometry = new PlaneGeometry(barWidth, barHeight, 1);

    for (let i = 0; i < data.length; i++) {
        const bar = new Mesh(geometry, i % 2 === 0 ? material1 : material2);
        bar.scale.y = (data[i] / maxValue) * 0.8;
        bar.position.x = barWidth / 2 + barWidth * i;
        bar.position.y = barHeight / 2;
        scene.add(bar);
    }

    return geometry;
}