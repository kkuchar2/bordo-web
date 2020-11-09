import React, {Component} from "react";

import "js/components/grid/Grid.scss"

import {
    Color,
    Mesh, MeshBasicMaterial, OrthographicCamera,
    PlaneGeometry,
    Raycaster,
    Scene, ShaderMaterial, Vector2, WebGLRenderer
} from "three";

const vertexShader = `
    uniform vec3 bboxMin;
    uniform vec3 bboxMax;

    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;

const fragmentShader = `
    uniform vec3 color;
    uniform float alpha;
    
    varying vec2 vUv;
    
    void main() {
      gl_FragColor = vec4(color, alpha);
    }
`;


class Grid extends Component {

    near = -100;
    far = 100;
    spacing = 0;
    a = 0;
    coords = new Vector2(-1, -1);
    nnx = 21;
    nny = 20;
    oldIdx = 0;

    state = {
        windowWidth: 0,
        windowHeight: 0
    }

    constructor(props) {
        super(props);
        this.renderer = new WebGLRenderer({alpha: true});
        this.renderer.setClearColor(0x000000, 0.0);
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();

        if (this.renderer !== undefined) {
            const gl = this.renderer.getContext();
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        let intervalId = setInterval(this.renderGL, 16);
        console.log("Setting interval: " + intervalId);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        console.log("Clearing interval: " + this.state.intervalId);
    }

    update = () => {
        console.log("Up[dateing");
    }

    updateDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
        this.recalculateGeometry();
    }

    renderGL = () => {
        if (this.renderer === undefined || this.scene === undefined || this.camera === undefined) {
            return;
        }

        let x = this.coords.x;
        let y = this.coords.y;

        let idxxx = Math.floor(x / (this.cellSizeX + this.spacing));
        let idxyy = Math.floor(y / (this.cellSizeY + this.spacing));
        let idxP = idxxx + idxyy * this.nnx;


        if (idxP > 0) {
            this.cells[this.oldIdx].material.color.set(this.oldIdx % 2 === 0 ? 0x333333 : 0x313131);
            this.cells[this.oldIdx].scale.x = 1.0;
            this.cells[this.oldIdx].scale.y = 1.0;
            this.cells[this.oldIdx].position.z = -5.0;
            this.cells[idxP].material.color.set(0xdddddd);
            this.cells[idxP].scale.x = 1.2;
            this.cells[idxP].scale.y = 1.2;
            this.cells[idxP].position.z = 1.0;
            this.oldIdx = idxP;
        }


        this.renderer.render(this.scene, this.camera);
    }

    componentDidUpdate = () => {
        this.recalculateGeometry();
        this.renderGL();
    }

    recalculateGeometry = () => {

        this.scene = new Scene();

        this.width = this.state.windowWidth;
        this.height = this.state.windowHeight - 100;

        this.camera = new OrthographicCamera(
            this.width / -2,
            this.width / 2,
            this.height / 2,
            this.height / -2,
            this.near,
            this.far);

        this.camera.position.z = 5;

        if (this.width <= 0 || this.height <= 0) {
            return;
        }

        this.renderer.setSize(this.width, this.height);
        this.mount.appendChild(this.renderer.domElement);

        this.raycaster = new Raycaster();

        this.cellSizeX = (this.width - 2 * this.a - (this.nnx - 1) * this.spacing) / this.nnx;
        this.cellSizeY = (this.height - 2 * this.a - (this.nnx - 1) * this.spacing) / this.nny;

        this.cells = [];

        for (let y = 0; y < this.nny; y++) {
            for (let x = 0; x < this.nnx; x++) {
                let cell = this.createCell(x, y);
                this.cells.push(cell);
                this.scene.add(cell);
            }
        }


        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            if (i % 2 === 0) {
                cell.material.color.set(0x333333);
            }
            else {
                cell.material.color.set(0x313131);
            }
        }
    };

    createCell = (x, y) => {
        let width = this.state.windowWidth;
        let height = this.state.windowHeight - 100;

        let material = new MeshBasicMaterial({color: 0x00ff00});
        let geometry = new PlaneGeometry(this.cellSizeX, this.cellSizeY, 1);
        const cell = new Mesh(geometry, material);
        cell.position.x = -width / 2 + this.a + x * this.cellSizeX + (x - 1) * this.spacing + this.cellSizeX / 2 + this.spacing;
        cell.position.y = -height / 2 + this.a + y * this.cellSizeY + (y - 1) * this.spacing + this.cellSizeY / 2 + this.spacing;
        return cell;
    };

    createMaterial = (color, alpha) => {
        return new ShaderMaterial({
            uniforms: {
                color: {value: new Color(color)},
                alpha: {value: alpha},
                bboxMin: {value: this.geometry.boundingBox.min},
                bboxMax: {value: this.geometry.boundingBox.max}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            wireframe: false
        });
    };
    handleClick = event => {
        event.preventDefault();
        this.coords.x = event.clientX;
        this.coords.y = event.clientY - 100;
    }

    handleMouseMove = event => {
        event.preventDefault();
        this.coords.x = event.clientX;
        this.coords.y = event.clientY - 100;
    };

    render = () => {
        return (
            <div onClick={this.handleClick} onMouseMove={this.handleMouseMove} className={"chart"} ref={ref => (this.mount = ref)}/>
        )
    }
}

export default Grid;
