import React, {Component} from 'react'

import "js/pages/CanvasPage.scss"

class CanvasPage extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvas = null;
        this.context = null;
        this.state = {x: 0, y: 1}
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    draw = ctx => {

        ctx.beginPath();
        ctx.fillStyle = '#c2c2c2';
        for (let i = 1; i < 20; i++) {
            ctx.rect(i * 25, 0, 1, 500);
            ctx.rect(0, i * 25, 500, 1);
        }
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#47cf73';
        this.drawPlayer(ctx, this.state.x, this.state.y);
        ctx.fill();
    }

    drawPlayer = (ctx, x, y) => {
        ctx.rect(x * 25 + 3, y * 25 + 3, 20, 20);
    };

    handleKeyDown(e) {
        console.log(e);
        this.draw(this.context);

        if (e.keyCode === 37) { // left
            this.setState({x: this.state.x > 0  ? this.state.x - 1 : 0, y: this.state.y});
        }
        else if (e.keyCode === 39) { // right
            this.setState({x: this.state.x < 19 ? this.state.x + 1 : 19, y: this.state.y});
        }
        else if (e.keyCode === 40) { // down
            this.setState({x: this.state.x, y: this.state.y < 19 ? this.state.y + 1 : 19});
        }
        else if (e.keyCode === 38) { // up
            this.setState({x: this.state.x, y: this.state.y > 0 ? this.state.y - 1 : 0});
        }
    }

    componentDidUpdate() {
        this.canvas = this.canvasRef.current;
        this.context = this.canvas.getContext('2d');
        this.draw(this.context)
        this.context.fillStyle = '#1d1d1d';
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.draw(this.context);
        this.context.restore();
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        this.canvas = this.canvasRef.current;
        this.context = this.canvas.getContext('2d');
        this.draw(this.context)
        this.context.fillStyle = '#1d1d1d';
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.draw(this.context);
        this.context.restore();
    }

    render() {
        return (<canvas className={"draw-canvas"} width={500} height={500} ref={this.canvasRef}/>)
    }
}

export default CanvasPage;