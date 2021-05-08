import {
    DynamicDrawUsage,
    FrontSide,
    InstancedBufferGeometry,
    InstancedMesh,
    Mesh,
    MeshBasicMaterial, Object3D,
    OrthographicCamera,
    PlaneBufferGeometry,
    PlaneGeometry,
    Scene,
    Color,
    WebGLRenderer,
} from "three";

export const dummyObj = new Object3D();
export const dummyColor = new Color();

export const colorOfHash = v => dummyColor.setHex("0x" + v.substring(1));

export const updateInstancedMeshColor = (mesh, instanceCount, color) => {
    for (let i = 0; i < instanceCount; i++) {
        mesh.setColorAt(i, colorOfHash(color));
    }
    mesh.instanceColor.needsUpdate = true;
}

export const createMaterial = (color, alpha) => {
    return new MeshBasicMaterial({
        color: color,
        alpha: alpha,
        side: FrontSide
    });
};

export const createOrthoCamera = (width, height, near, far, z) => {
    let camera = new OrthographicCamera(0, width, height, 0, -1000, 1000);
    camera.position.z = z;
    camera.lookAt(0, 0, 0);
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

export const calculateBarsSizes = (width, barsCount) => {
    let maxBarWidth = width / barsCount;
    let spacing = 0;
    let barWidth = 1;
    let min = Math.min();
    let targetBarWidth = -1;
    let targetSpacing = -1;

    while (barWidth <= maxBarWidth) {
        while (spacing <= 5) {
            let diff = width - barsCount * (barWidth + spacing);

            if (diff < min && diff > 0) {
                min = diff;
                targetSpacing = spacing;
                targetBarWidth = barWidth;
            }

            spacing++;
        }
        barWidth++;
        spacing = 0;
    }

    barWidth = targetBarWidth;
    spacing = targetSpacing;

    if (barWidth === -1) {
        barWidth = maxBarWidth;
        spacing = 0;
    }

    const offsetX = Math.floor((width - barsCount * (barWidth + spacing)) / 2);

    return {barWidth, spacing, offsetX}
}

export const updateInstancedBar = (idx, mesh, value, maxValue, height, barWidth, spacing, offsetX, color) => {
    const scale = (value / maxValue) * height;
    dummyObj.scale.set(barWidth, scale, 1);
    dummyObj.position.set(barWidth / 2 + barWidth * idx + spacing * idx + offsetX, scale / 2, 0);
    dummyObj.updateMatrix();
    mesh.setColorAt(idx, colorOfHash(color));
}

export const createBars = (scene, width, height, data, maxValue, color) => {
    removeChildrenFromScene(scene);

    const geom = new InstancedBufferGeometry().copy(new PlaneBufferGeometry(1, 1));
    const mesh = new InstancedMesh(geom, new MeshBasicMaterial({ color: 0xffffff, opacity: 1, transparent: false}), maxValue);
    const {barWidth, spacing, offsetX} = calculateBarsSizes(width, data.length);

    for (let x = 0; x < data.length; x++) {
        updateInstancedBar(x, mesh, data[x], maxValue, height, barWidth, spacing, offsetX, color);
        mesh.setMatrixAt(x, dummyObj.matrix);
    }

    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
};