import React, {Component} from "react";
import {footerHeight, navbarHeight} from "js/constants.js";

import {
    Mesh, MeshBasicMaterial, OrthographicCamera,
    PlaneGeometry,
    Scene, Vector2, WebGLRenderer
} from "three";

import "./GridPage.scss"

class GridPage extends Component {

    canvasRef = React.createRef();

    near = -100;
    far = 100;
    spacing = 0;
    a = 0;
    nnx = 21;
    nny = 20;
    oldIdx = 0;
    coords = new Vector2(-1, -1);

    componentDidMount = () => {
        this.renderer = new WebGLRenderer({canvas: this.canvasRef.current, alpha: true});
        this.renderer.setClearColor(0x000000, 0.0);
        let intervalId = setInterval(this.refreshState, 16);
        this.setState({intervalId: intervalId});
        const gl = this.renderer.getContext();
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.forceUpdate();
    };

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    componentDidUpdate = () => {
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

        console.log("Cells size: " + this.cells.length + " old idx: " + this.oldIdx);

        if (idxP > 0 && idxP < this.cells.length) {
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

    recalculateGeometry = () => {

        this.scene = new Scene();

        this.width = window.innerWidth;
        this.height = window.innerHeight - navbarHeight - footerHeight;

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

        this.cellSizeX = (this.width - 2 * this.a - (this.nnx - 1) * this.spacing) / this.nnx;
        this.cellSizeY = (this.height - 2 * this.a - (this.nnx - 1) * this.spacing) / this.nny;

        this.cells = [];

        let i = 0;
        for (let y = 0; y < this.nny; y++) {
            for (let x = 0; x < this.nnx; x++) {
                let cell = this.createCell(x, y, i);
                this.cells.push(cell);
                this.scene.add(cell);
                i++;
            }
        }

        this.renderGL()
    };

    createCell = (x, y, index) => {
        let width = window.innerWidth;
        let height = window.innerHeight - navbarHeight - footerHeight;
        let material = new MeshBasicMaterial({color: index % 2 === 0 ? 0x333333 : 0x313131});
        let geometry = new PlaneGeometry(this.cellSizeX, this.cellSizeY, 1);
        const cell = new Mesh(geometry, material);
        cell.position.x = -width / 2 + this.a + x * this.cellSizeX + (x - 1) * this.spacing + this.cellSizeX / 2 + this.spacing;
        cell.position.y = -height / 2 + this.a + y * this.cellSizeY + (y - 1) * this.spacing + this.cellSizeY / 2 + this.spacing;
        return cell;
    };

    handleClick = event => {
        event.preventDefault();
        this.coords.x = event.clientX;
        this.coords.y = event.clientY;
    }

    handleMouseMove = event => {
        event.preventDefault();
        this.coords.x = event.clientX;
        this.coords.y = event.clientY;
    };

    render = () => {
        return (
            <div className={"glView"} style={{height: this.props.height}}>
                <canvas onClick={this.handleClick} onMouseMove={this.handleMouseMove}  ref={this.canvasRef}/>
            </div>
        )
    }
}

export default GridPage;