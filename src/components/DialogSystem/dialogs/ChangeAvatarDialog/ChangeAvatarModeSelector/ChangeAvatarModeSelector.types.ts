import {ChangeEventHandler} from 'react';

import {TFunction} from 'react-i18next';

export interface StyledSelectGIFCircleProps {
    url: string;
}

export interface ChangeAvatarModeSelectorProps {
    translation?: TFunction<'translation'>,
    onFileSelected: ChangeEventHandler<HTMLInputElement>;
    onAnimatedAvatarSelected: () => void
}