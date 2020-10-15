import React, {Component} from "react";

class Image extends Component {

    constructor(props) {
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.state = {aspectRatio: 0.0, width: -1, height: 0};
    }

    onImgLoad({target: img}) {

        // Set initial values
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let aR = w / h; // aspect ratio

        // Resize if user defined with or height through props
        let pW = this.props.width;
        let pH = this.props.height;

        let rW = w;
        let rH = h;

        if (pW !== undefined && pH === undefined) {
            rW = pW;
            rH = pW / aR;
        } else if (pH !== undefined && pW === undefined) {
            rW = pH * aR;
            rH = pH;
        } else if (pH !== undefined && pW !== undefined) {
            if (pH < pW) {
                rW = pH * aR;
                rH = pH;
            } else {
                rW = pW;
                rH = pW / aR;
            }
        }

        // Scale, if user defined scale through props
        let scale = this.props.scale;
        if (scale === undefined) return;
        if (scale < 0.0) return;
        this.setState({width: rW * scale, height: rH * scale});

        // Invoke callback if it was defined through props
        let imageLoadCallback = this.props.onImageLoad;
        if (imageLoadCallback === undefined) return;
        imageLoadCallback();
    }

    render() {
        return (
            <img
                onLoad={this.onImgLoad}
                src={this.props.src}
                width={this.state.width}
                height={this.state.height}
                alt={this.props.alt}/>
        )
    }
}

export default Image;