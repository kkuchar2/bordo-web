import React, {Component} from "react";

import "./SelectControl.scss"

class SelectControl extends Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            selectedOption: -1,
            open: false
        };
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    onClick = () => {
        if (!this.props.disabled) {
            this.toggleDropdown();
        }
    };

    toggleDropdown = () => {
        this.setState({open: !this.state.open});
    };

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({open: false});
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setState({selectedOption: this.props.value});
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    onOptionSelected = (e) => {
        let index = e.currentTarget.getAttribute("data-index");
        this.setState({selectedOption: index});
        this.props.onChange(index);
        this.setState({open: !this.state.open});
    };

    getAdditionalClassName() {
        if (this.props.disabled) {
            return "disabled";
        }
        else {
            return "enabled";
        }
    }

    renderOption = (option, index) => {
        return (
            <div key={index} data-index={index} onClick={this.onOptionSelected} className="option">
                <span className="label">{option}</span>
            </div>
        );
    };

    renderOptions = () => {
        return (this.state.open &&
            <div className={"options"}>
                {this.props.options.map((item, index) => this.renderOption(item, index))}
            </div>
        );
    };

    getTopValue = () => {
        let selectedOption = this.state.selectedOption;
        let options = this.props.options;
        return selectedOption === -1 ? "Select sorting algorithm" : options[selectedOption];
    };

    render() {
        return (
            <div ref={this.setWrapperRef}
                 className={["select-control", this.props.className, this.getAdditionalClassName()].join(" ")}>
                <input type="button" onClick={this.onClick} className="options-view-button"/>
                <div className="brd select-button">
                    <div className="selected-value">
                        <div>{this.getTopValue()}</div>
                    </div>
                    <div id="chevrons">
                        <span className="chevron top"/>
                        <span className="chevron bottom"/>
                    </div>
                </div>

                {this.renderOptions()}
            </div>
        )
    }
}

export default SelectControl;