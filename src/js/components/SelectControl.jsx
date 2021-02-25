import React, {useRef, useState, useEffect} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

import "componentStyles/SelectControl.scss";

function SelectControl(props) {

    const wrapper = useRef(null);

    const [selectedOption, setSelectedOption] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapper && !wrapper.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        setSelectedOption(props.value);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => props.onChange(selectedOption), [selectedOption]);

    const onClick = () => {
        if (!props.disabled) {
            toggleDropdown();
        }
    };

    const toggleDropdown = () => setOpen(!open);

    const onOptionSelected = e => {
        let index = e.currentTarget.getAttribute("data-index");
        setSelectedOption(index);
        setOpen(!open);
    };

    const getAdditionalClassName = () => props.disabled ? "disabled" : "enabled";

    const renderOption = (option, index) => <div
        key={index} data-index={index} onClick={onOptionSelected} className="option">
        <span className="label">{option}</span>
    </div>;

    const renderOptions = () => {
        return (open &&
            <div className={"options"}>
                {props.options.map((item, index) => renderOption(item, index))}
            </div>
        );
    };

    const getTopValue = () => selectedOption === -1 ? "Select sorting algorithm" : props.options[selectedOption];

    return <div ref={wrapper} className={["select-control", props.className, getAdditionalClassName()].join(" ")}>
        <div onClick={onClick} className="select-control-button">
            <div className="selected-value">
                <div>{getTopValue()}</div>
            </div>
            <div className={"arrowDown"}>
                <FontAwesomeIcon icon={faChevronDown}/>
            </div>
        </div>
        {renderOptions()}
    </div>;
}

export default SelectControl;