import React, {Component} from "react";

import "./BarsView.scss"

import {
    Color, Mesh,
    OrthographicCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    WebGLRenderer
} from "three";

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

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

class BarsView extends Component {

    samples = 0;
    maxValue = 0;

    near = -500;
    far = 1000;

    constructor(props) {
        super(props);
        this.renderer = new WebGLRenderer({alpha: true});
        this.renderer.setClearColor(0x000000, 0.0);
    }

    componentDidMount = () => {
        let intervalId = setInterval(this.refreshState, 16);
        this.setState({intervalId: intervalId});
        const gl = this.renderer.getContext();
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    componentDidUpdate = () => {
        const regex = /^([1-9][0-9]{0,3}|10000)$/;

        if (this.props.samples === undefined) {
            this.samples = this.props.data.length;
        }
        else {
            if (this.samples !== this.props.samples && regex.test(this.props.samples)) {
                this.samples = this.props.samples;
            }
        }

        if (this.props.maxValue === undefined) {
            this.maxValue = this.props.data.max();
        }
        else {
            if (this.maxValue !== this.props.maxValue) {
                this.maxValue = this.props.maxValue;
            }
        }

        this.recalculateGeometry();
        this.renderGL();
    }

    renderGL = () => {
        if (this.renderer === undefined || this.scene === undefined || this.camera === undefined) {
            return;
        }

        this.renderer.render(this.scene, this.camera);
    }

    recalculateGeometry = () => {
        this.width = this.props.width;
        this.height = this.props.height;

        this.barWidth = this.width / this.samples;
        this.barHeight = this.height;

        // Create camera
        this.camera = new OrthographicCamera(
            this.width / -2,
            this.width / 2,
            this.height / 2,
            this.height / -2,
            this.near,
            this.far);

        this.camera.position.z = -5;

        // Create renderer
        if (this.width <= 0 || this.height <= 0) {
            console.log("errr, width: " + this.width + " height: " + this.height);
            return;
        }

        this.renderer.setSize(this.width, this.height);
        this.mount.appendChild(this.renderer.domElement);

        this.geometry = new PlaneGeometry(this.barWidth, this.barHeight, 1);
        this.geometry.computeBoundingBox();

        this.material1 = this.createMaterial(0xaaff00, 0.2);
        this.material2 = this.createMaterial(0xff2200, 0.5);

        this.bars = [];

        // Create scene
        this.scene = new Scene();

        // Add elements to scene

        for (let i = 0; i < this.samples; i++) {
            let bar = this.createBar(i);
            this.bars.push(bar);
            this.scene.add(bar);
        }

        for (let i = 0; i < this.samples; i++) {
            this.scaleBar(i, this.props.data[i] / this.maxValue);
            this.bars[i].material = i % 2 === 0 ? this.material1 : this.material2;
        }
    }

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

    scaleBar = (index, scale) => {
        this.bars[index].scale.y = scale;
        this.bars[index].position.y = -((1.0 - scale) / 2.0) * this.barHeight;
    }

    createBar = idx => {
        const bar = new Mesh(this.geometry, this.material1);
        bar.scale.y = 0.001;
        bar.position.x = -this.width / 2 + this.barWidth / 2 + this.barWidth * idx;
        return bar;
    }

    render = () => {
        return (<div className={"glView"} ref={ref => (this.mount = ref)}/>)
    }
}

export default BarsView;
