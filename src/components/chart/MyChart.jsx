import React, {Component} from "react";

import "./MyChart.scss"
import {
    Color, FrontSide,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    WebGLRenderer
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
    uniform vec3 color1;
    uniform vec3 color2;
    
    varying vec2 vUv;
    
    void main() {
      gl_FragColor = mix(vec4(color1, 1.0), vec4(color2, 0.0),  smoothstep(0.0, 1.8, vUv.y));
    }
`;

class MyChart extends Component {

    constructor(props) {
        super(props);

        this.scaleBar = this.scaleBar.bind(this);
        this.recalculateGeometry = this.recalculateGeometry.bind(this);
        this.renderGL = this.renderGL.bind(this);

        this.samples = 0;
        this.maxValue = 0;
        this.lastMarkIdx = 0;

        this.renderer = new WebGLRenderer({alpha: true});
        this.renderer.setClearColor(0x000000, 0.0);

        this.near = -500;
        this.far = 1000;

        this.state = {
            windowWidth: 0,
            windowHeight: 0
        }
    }

    updateDimensions = () => {
        console.log("SortDemonstrationPage() updating dimensions: " + window.innerWidth + " " + window.innerHeight);
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
        this.recalculateGeometry();
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();

        if (this.renderer !== undefined) {
            const gl = this.renderer.getContext();
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            return;
        }

        setInterval(this.refreshState, 16);
    }


    componentDidUpdate() {
        //console.log("Chart componentDidUpdate()");

        let dirtyGeometry = false;

        if (this.samples !== this.props.samples) {
            this.samples = this.props.samples;
            dirtyGeometry = true;
        }

        if (this.maxValue !== this.props.maxValue) {
            this.maxValue = this.props.maxValue;
            dirtyGeometry = true;
        }

        if (dirtyGeometry) {
            this.recalculateGeometry();
        }

        for (let i = this.lastMarkIdx; i < this.props.markIdx; i++) {

            this.scaleBar(i, this.props.data[i] / this.maxValue);

            if (this.props.markIdx === -1) {
                this.bars[i].material = this.baseMaterial;
            } else if (i === this.props.currIdx) {
                this.bars[i].material = this.blueMaterial;
            } else {
                this.bars[i].material = this.baseMaterial;
            }

        }

        this.lastMarkIdx = this.props.markIdx;

        if (this.lastMarkIdx === this.samples) {
            this.lastMarkIdx = 0;
        }

        this.renderGL();
    }

    renderGL() {
        if (this.renderer === undefined || this.scene === undefined || this.camera === undefined) {
            return;
        }

        this.renderer.render(this.scene, this.camera);
    }

    recalculateGeometry() {
        console.log("MyChart() Recalculating geometry, samples: " + this.samples);

        this.width = this.state.windowWidth * 0.8;
        this.height = this.state.windowWidth > 600 ? 600 : this.state.windowWidth / 1.5;

        console.log("MyChart() width: " + this.width + ", " + this.height);

        this.barWidth = this.width / this.samples;

        console.log("Bar width: " + this.barWidth);

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

        this.renderer.setSize(this.width, this.height);
        this.mount.appendChild(this.renderer.domElement);
        console.log(this.mount.childNodes.length);

        this.geometry = new PlaneGeometry(this.barWidth, this.barHeight, 1);
        this.geometry.computeBoundingBox();

        this.baseMaterial = new ShaderMaterial({
            uniforms: {
                color1: {value: new Color(0xffffff)},
                color2: {value: new Color(0xffffff)},
                bboxMin: {value: this.geometry.boundingBox.min},
                bboxMax: {value: this.geometry.boundingBox.max}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            wireframe: false
        });
        this.blueMaterial = new MeshBasicMaterial({color: 0x00aaff, side: FrontSide});

        this.bars = [];

        // Create scene
        this.scene = new Scene();

        // Add elements to scene
        for (let i = 0; i < this.samples; i++) {
            let bar = this.createBar(i);
            this.bars.push(bar);
            this.scene.add(bar);
        }

    }

    scaleBar(index, scale) {
        this.bars[index].scale.y = scale;
        this.bars[index].position.y = -((1.0 - scale) / 2.0) * this.barHeight;
    }

    createBar(position) {
        const bar = new Mesh(this.geometry, this.baseMaterial);
        bar.scale.y = 0.001;
        bar.position.x = -this.width / 2 + this.barWidth / 2 + this.barWidth * position;
        return bar;
    }


    render() {
        return (
            <div className={"chart"} ref={ref => (this.mount = ref)}/>
        )
    }
}

export default MyChart;
