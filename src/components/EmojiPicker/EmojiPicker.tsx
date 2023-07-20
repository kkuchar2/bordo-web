import React, { useCallback, useEffect, useRef } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import Picker from '@emoji-mart/react';

export interface SelectedEmoji {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string[];
}

interface EmojiPickerProps {
    open: boolean;
    onEmojiSelect: (emoji: SelectedEmoji) => void;
    onEmojiClose: () => void;
}

export const EmojiPicker = (props: EmojiPickerProps & BoxProps) => {

    const ref = useRef(null);

    const { open, onEmojiSelect, onEmojiClose, ...rest } = props;

    const handleClickOutside = useCallback((event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onEmojiClose();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    if (!open) {
        return null;
    }

    return <Box {...rest} ref={ref}>
        <Picker onEmojiSelect={onEmojiSelect}
            autoFocus={true}
            theme={'dark'}
            previewPosition={'none'}
            icons={'solid'}
            maxFrequentRows={2}
            native={true}
            disableAutoFocus={true}/>
    </Box>;
};