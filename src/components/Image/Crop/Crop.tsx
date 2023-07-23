import React, { useCallback, useState } from 'react';

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';

import { CropContainer } from '@/components/DialogSystem/dialogs/ChangeAvatarDialog/style';

interface CropProps {
    image?: string
    disabled?: boolean
    onCroppedAreaChange?: (area: Area) => void
}

export const Crop = (props: CropProps) => {

    const { image, disabled, onCroppedAreaChange } = props;

    const [zoom, setZoom] = useState<number>(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const onZoomChange = useCallback((zoomValue: number) => {
        if (disabled) {
            return;
        }
        setZoom(zoomValue);
    }, [disabled]);

    const onZoomSliderChange = useCallback((value: number) => {
        if (disabled) {
            return;
        }
        setZoom(value / 100 * 10);
    }, [disabled]);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        if (disabled) {
            return;
        }
        onCroppedAreaChange(croppedAreaPixels);
    }, [disabled, onCroppedAreaChange]);

    return <div className={'flex flex-col gap-[40px]'}>
        <CropContainer imageSelected={image != null} width={400}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                cropShape={'round'}
                aspect={1}
                minZoom={1}
                maxZoom={10}
                objectFit={'vertical-cover'}
                showGrid={false}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
                onCropChange={setCrop}/>
        </CropContainer>
        <div className={'flex w-full items-center justify-center gap-[20px] p-[40px]'}>
            <PhotoIcon width={30} height={30}/>
            <Slider aria-label={'slider-ex-4'}
                defaultValue={10}
                value={zoom * 10}
                onChange={onZoomSliderChange}
                min={10}
                max={100}>
                <SliderTrack bg={'red.100'}>
                    <SliderFilledTrack bg={'tomato'}/>
                </SliderTrack>
                <SliderThumb boxSize={6}/>
            </Slider>
            <PhotoIcon width={60} height={60}/>
        </div>
    </div>;
};