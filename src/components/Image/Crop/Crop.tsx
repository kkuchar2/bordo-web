import React, {useCallback, useState} from "react";

import {CropContainer, sliderTheme, SliderWithIcons} from "components/Dialogs/ChangeAvatarDialog/style";
import {Slider} from "kuchkr-react-component-library";
import Cropper from "react-easy-crop";
import {Area} from "react-easy-crop/types";

import { CropProps } from "./Crop.types";
import { StyledCrop } from "./style";

export const Crop = (props: CropProps) => {

    const {image, disabled, onCroppedAreaChange} = props;

    const [zoom, setZoom] = useState<number>(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const onZoomChange = useCallback((zoomValue: number) => {
        if (disabled) {
            return;
        }
        setZoom(zoomValue);
    }, [disabled]);

    const onZoomSliderChange = useCallback((event: React.ChangeEvent<{}>, value: number) => {
        if (disabled) {
            return;
        }
        setZoom(value);
    }, [disabled]);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        console.log('Crop complete: ', croppedArea, croppedAreaPixels);
        if (disabled) {
            console.log('Not setting');
            return;
        }

        console.log('Setting cropped area: ', croppedArea);
        onCroppedAreaChange(croppedAreaPixels);
    }, [disabled, onCroppedAreaChange]);

    return <StyledCrop>
        <CropContainer imageSelected={image != null}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                cropShape="round"
                aspect={1}
                objectFit="vertical-cover"
                showGrid={false}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
                onCropChange={setCrop}/>
        </CropContainer>
        <SliderWithIcons>
            <img style={{ marginRight: 15, marginBottom: 7 }} src={"assets/images/picture_icon.png"} width={20}
                 alt={'sliderIconSmall'}/>
            <Slider value={zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    useMarks={false}
                    onChange={onZoomSliderChange}
                    disabled={disabled}
                    innerModernSlider={true}
                    theme={sliderTheme}/>
            <img style={{ marginLeft: 15, marginBottom: 8 }} src={"assets/images/picture_icon.png"} width={30}
                 alt={'sliderIconBig'}/>
        </SliderWithIcons>
    </StyledCrop>;
};