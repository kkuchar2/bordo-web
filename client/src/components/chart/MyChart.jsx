import React, {Component} from "react";
import {getRandomInt} from "../../helpers/util.jsx";

import * as THREE from "three";

import "./MyChart.scss"

class MyChart extends Component {

    constructor(props) {
        super(props);

        this.sort = this.sort.bind(this);
        this.initData = this.initData.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
        this.refreshState = this.refreshState.bind(this);

        this.worker = new Worker('./../../workers/sort.worker', {type: 'module'});
        this.worker.onmessage = this.onDataReceived;

        this.samples = 10;
        this.maxValue = 1000;

        this.width = 1200;
        this.height = 600;
        this.spacing = this.samples > this.width ? 0 : 1;

        this.barWidth = (this.width - (this.samples - 1) * this.spacing) / this.samples;
        this.barHeight = this.height;
        this.near = -500;
        this.far = 1000;

        this.geometry = new THREE.PlaneGeometry(this.barWidth, this.barHeight, 1);
        this.geometry.computeBoundingBox();

        this.baseMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color1:  { value: new THREE.Color(0xffffff) },
                color2:  { value: new THREE.Color(0xffffff) },
                bboxMin: { value: this.geometry.boundingBox.min },
                bboxMax: { value: this.geometry.boundingBox.max }
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

        this.state = {
            y: [],
            currIdx: 0,
            initializing: true,
            dirty: false
        };

        this.bars = [];
    }

    onDataReceived(e) {
        console.log("[DATA] Received data" + e.data[0]);
        this.state.y = e.data[0];
        this.state.currIdx = e.data[1];
        this.state.dirty = true;
    }

    componentDidMount() {
        // Create camera
        const camera = new THREE.OrthographicCamera(
            this.width / -2,
            this.width / 2,
            this.height / 2,
            this.height / -2,
            this.near,
            this.far);

        camera.position.z = -5;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setClearColor(0x000000, 0.0);
        renderer.setSize(this.width, this.height);
        this.mount.appendChild(renderer.domElement);

        // Create scene
        const scene = new THREE.Scene();

        // Add elements to scene
        for (let i = 0; i < this.samples; i++) {
            let bar = this.createBar(i);
            this.bars.push(bar);
            scene.add(bar);
        }

        // Render loop
        const animate = function () {
            const gl = renderer.getContext();
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        this.initData();
    }

    scaleBar(bar, scale) {
        bar.scale.y = scale;
        bar.position.y = -((1.0 - scale) / 2.0) * this.barHeight;
    }

    createBar(position) {
        const bar = new THREE.Mesh(this.geometry, this.baseMaterial);
        bar.position.x = -this.width / 2 + this.barWidth / 2 + this.barWidth * position + this.spacing * position;
        return bar;
    }

    componentDidUpdate() {
        if (!this.state.initializing) return;
        this.setState({initializing: false});
        setInterval(this.refreshState, 16);
        this.sort();
    }

    refreshState() {
        if (!this.state.dirty) return;

        for (let i = 0; i < this.samples; i++) {
            this.scaleBar(this.bars[i], this.state.y[i] / this.maxValue);

            if (this.state.currIdx === -1) {
                this.bars[i].material = this.baseMaterial;
            } else if (i === this.state.currIdx) {
                this.bars[i].material = this.blueMaterial;
            } else {
                this.bars[i].material = this.baseMaterial;
            }

        }

        this.forceUpdate();
        this.state.dirty = false;
    }

    initData() {
        let y = [];

        for (let i = 0; i < this.samples; i++) {
            let v = getRandomInt(1, this.maxValue);
            y.push(v);
            this.scaleBar(this.bars[i], v / this.maxValue);
        }

        this.setState({y: y});
    }

    sort() {
        this.worker.postMessage([new Uint8Array(this.state.y)]);
    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)}/>
        )
    }
}

export default MyChart;