import React, {Component} from "react";

import * as THREE from "three";

import "./MyChart.scss"

class MyChart extends Component {

    constructor(props) {
        super(props);

        this.scaleBar = this.scaleBar.bind(this);
        this.recalculateGeometry = this.recalculateGeometry.bind(this);
        this.renderGL = this.renderGL.bind(this);

        this.samples = -1;
        this.maxValue = -1;
        this.lastMarkIdx = 0;
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

    componentDidMount() {
        if (this.renderer !== undefined) {
            const gl = this.renderer.getContext();
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            return;
        }

        setInterval(this.refreshState, 16);
    }

    renderGL() {
        if (this.renderer === undefined || this.scene === undefined || this.camera === undefined) {
            return;
        }

        this.renderer.render(this.scene, this.camera);
    }

    recalculateGeometry() {
        console.log("Recalculating geometry, samples: " + this.samples);

        this.width = 1200;
        this.height = 600;
        this.spacing = 0;

        this.barWidth = (this.width - (this.samples - 1) * this.spacing) / this.samples;
        this.barHeight = this.height;
        this.near = -500;
        this.far = 1000;

        // Create camera
        this.camera = new THREE.OrthographicCamera(
            this.width / -2,
            this.width / 2,
            this.height / 2,
            this.height / -2,
            this.near,
            this.far);

        this.camera.position.z = -5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setSize(this.width, this.height);
        this.mount.appendChild(this.renderer.domElement);

        this.geometry = new THREE.PlaneGeometry(this.barWidth, this.barHeight, 1);
        this.geometry.computeBoundingBox();

        this.baseMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color1: {value: new THREE.Color(0xffffff)},
                color2: {value: new THREE.Color(0xffffff)},
                bboxMin: {value: this.geometry.boundingBox.min},
                bboxMax: {value: this.geometry.boundingBox.max}
            },
            vertexShader: `
                uniform vec3 bboxMin;
                uniform vec3 bboxMax;

                varying vec2 vUv;

                void main() {
                  vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                }
              `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;

                varying vec2 vUv;

                void main() {
                  vec4 color = mix(vec4(color1, 0.8), vec4(color2, 1.0),  smoothstep(0.1, 0.5, vUv.y));
                  gl_FragColor = mix(vec4(color1, 0.8), color,  smoothstep(0.0, 0.2, vUv.y));
                }
              `,
            wireframe: false
        });
        this.blueMaterial = new THREE.MeshBasicMaterial({color: 0x00aaff, side: THREE.FrontSide});

        this.bars = [];

        // Create scene
        this.scene = new THREE.Scene();

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
        const bar = new THREE.Mesh(this.geometry, this.baseMaterial);
        bar.scale.y = 0.001;
        bar.position.x = -this.width / 2 + this.barWidth / 2 + this.barWidth * position + this.spacing * position;
        return bar;
    }


    render() {
        return (
            <div ref={ref => (this.mount = ref)}/>
        )
    }
}

export default MyChart;
