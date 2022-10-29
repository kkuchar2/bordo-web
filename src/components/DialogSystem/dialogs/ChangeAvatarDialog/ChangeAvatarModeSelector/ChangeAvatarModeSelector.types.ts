import { TFunction } from 'i18next';
import {ChangeEventHandler} from 'react';

export interface StyledSelectGIFCircleProps {
    url: string;
}

export interface ChangeAvatarModeSelectorProps {
    translation?: TFunction<'translation'>,
    onFileSelected: ChangeEventHandler<HTMLInputElement>;
    onAnimatedAvatarSelected: () => void
}
