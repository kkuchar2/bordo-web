import {Area} from "react-easy-crop/types";

export interface CropProps {
    image?: string
    className?: string
    disabled?: boolean
    onCroppedAreaChange?: (area: Area) => void
}