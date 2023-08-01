import { useCallback, useState } from 'react';

import { PhotoIcon } from '@heroicons/react/24/solid';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';

type CropProps = {
    image: string
    disabled?: boolean
    onCroppedAreaChange?: (area: Area) => void
}

import styles from './Crop.module.scss';

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

        if (!onCroppedAreaChange) {
            return;
        }

        onCroppedAreaChange(croppedAreaPixels);
    }, [disabled, onCroppedAreaChange]);

    return <div className={'flex flex-col gap-[40px]'}>
        <div className={'relative box-border flex w-full flex-col items-center justify-center'}
            style={{
                width: image ? '100%' : 200,
                height: image ? 400 : 200,
            }}>
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
        </div>
        <div className={'flex w-full items-center justify-center gap-[20px] p-[40px]'}>
            <PhotoIcon width={30} height={30}/>
            <input type={'range'}
                className={styles.slider}
                value={zoom * 10}
                onChange={(e) => onZoomSliderChange(parseInt(e.target.value))}
                min={10}
                max={100}/>
            <PhotoIcon width={60} height={60}/>
        </div>
    </div>;
};