import {
    CircleGeometry,
    Mesh, MeshBasicMaterial,
    OrthographicCamera,
    PlaneGeometry,
    Scene, WebGLRenderer,
} from "three";
import TWEEN from "@tweenjs/tween.js";

export const createMaterial = (color, alpha) => {
    return new MeshBasicMaterial({
        color: color,
        opacity: alpha
    });
};

export const createOrthoCamera = (width, height, near, far, z) => {
    let camera = new OrthographicCamera(0, width, height, 0, near, far);
    camera.left = 0;
    camera.right = width;
    camera.top = height;
    camera.bottom = 0;
    camera.position.z = z;
    camera.updateProjectionMatrix();
    return camera;
};

export const createRenderer = (width, height, clearColor) => {
    let renderer = new WebGLRenderer({alpha: true});
    renderer.setClearColor(clearColor, 0);
    renderer.setSize(width, height);
    return renderer;
};

export const enableTransparency = renderer => {
    const gl = renderer.getContext();
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};

export const updateCamera = (camera, left, right, top, bottom) => {
    camera.left = left;
    camera.right = right;
    camera.top = top;
    camera.bottom = bottom;
    camera.updateProjectionMatrix();
};

export const removeChildrenFromScene = scene => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
};

export const createPlaneGeometry = (width, height) => new PlaneGeometry(width, height, 1);

export const createScene = () => new Scene();

export const createCells = (scene, defaultMaterial, startMaterial, endMaterial, cellSize, cols, rows, startIdx, endIdx) => {
    const size = cols * rows;

    if (size === 0) {
        return null;
    }

    let geometry = new createPlaneGeometry(cellSize, cellSize);

    for (let i = 0; i < size; i++) {

        let material = defaultMaterial.clone();

        if (startIdx === i) {
            material = startMaterial.clone();
        }
        else if (endIdx === i) {
            material = endMaterial.clone();
        }

        const cell = new Mesh(geometry, material.clone());
        const x = Math.round(i % cols);
        const y = Math.round(Math.floor(i / cols));

        cell.layers.enable(1);
        cell.name = "Cell_" + x + "_" + y;
        cell.scale.y = 1;
        cell.position.z = -3;
        cell.position.x = cellSize / 2 + cellSize * x;
        cell.position.y = cellSize / 2 + cellSize * y;
        cell.userData = {
            id: i,
            selected: false,
            isStart: startIdx === i,
            isEnd: endIdx === i,
            x: x,
            y: y
        };

        scene.add(cell);
    }

    return geometry;
};

export const createLines = (scene, material, cellSize, cols, rows, width, height) => {
    const thickness = 2;
    const geometry = new createPlaneGeometry(thickness, height);
    const geometry2 = new createPlaneGeometry(width, thickness);

    let count = 0;

    for (let i = 0; i < cols + 1; i++) {
        const line = new Mesh(geometry, material.clone());
        line.position.z = -1;

        if (i === 0) {
            line.position.x = i * cellSize + thickness / 2;
        }
        else {
            line.position.x = i === cols ? i * cellSize - thickness / 2 : i * cellSize;
        }

        line.position.y = height / 2;
        line.layers.enable(2);
        scene.add(line);
        count++;
    }

    for (let i = 0; i < rows + 1; i++) {
        const line = new Mesh(geometry2, material);
        line.position.z = -1;
        line.position.x = width / 2;

        if (i === 0) {
            line.position.y = i * cellSize + thickness / 2;
        }
        else {
            line.position.y = i === rows ? i * cellSize - thickness / 2 : i * cellSize;
        }
        line.layers.enable(2);
        scene.add(line);
        count++;
    }

    return count;
};

export const createCircle = (scene, material, radius, position) => {
    let geometry = new CircleGeometry(radius, 32);
    const circle = new Mesh(geometry, material);
    circle.position.x = position[0];
    circle.position.y = position[1];
    scene.add(circle);
    return circle;
};

export const createBars = (scene, material, width, height, data, maxValue, maxSpacing) => {
    removeChildrenFromScene(scene);

    let spacing = maxSpacing;
    let barWidth = (width - (spacing * data.length)) / data.length;
    let barHeight = height;

    while (barWidth < 1 && spacing > 0) {
        spacing -= 1;
        barWidth = (width - (spacing * data.length)) / data.length;

        if (barWidth > 1) {
            break;
        }
    }

    let geometry = new PlaneGeometry(1, barHeight, 1);

    for (let i = 0; i < data.length; i++) {
        const bar = new Mesh(geometry, material);
        bar.scale.x = barWidth;
        bar.scale.y = (data[i] / maxValue);
        bar.position.x = barWidth / 2 + barWidth * i + spacing * i;
        bar.position.y = barHeight / 2 - (height * (1.0 - bar.scale.y)) / 2;
        scene.add(bar);
    }
};

export const tweenScale = (mesh, time) => {
    mesh.scale.x = 0;
    mesh.scale.y = 0;
    mesh.position.z = -2;
    return new TWEEN.Tween(mesh.scale).to({x: 0.9, y: 0.9, z: 1.3}, time).onComplete(() => {
        new TWEEN.Tween(mesh.scale).to({x: 1.0, y: 1.0, z: 1.0}, time).start();
    }).start();
};

export const tweenMaterial = (mesh, targetMaterial, time, onEndFunc = () => {}) => {
    const m = targetMaterial.clone();
    return new TWEEN.Tween(mesh.material)
        .to({color: m.color, opacity: m.opacity}, time)
        .onComplete(() => onEndFunc())
        .start();
};

export const calculateCellsInCircle = (x, y, radius, matrix) => {
    const selectionIndexes = [];

    for (let i = 0; i < matrix.length; i++) {
        const a = matrix[i].userData.x - x;
        const b = matrix[i].userData.y - y;

        if (a * a + b * b <= radius * radius) {
            selectionIndexes.push(i);
        }
    }

    return selectionIndexes;
};