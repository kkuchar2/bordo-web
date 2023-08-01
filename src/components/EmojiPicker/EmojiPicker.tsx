import { useCallback, useEffect, useRef } from 'react';

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
    className?: string;
    open: boolean;
    onEmojiSelect: (emoji: SelectedEmoji) => void;
    onEmojiClose: () => void;
}

export const EmojiPicker = (props: EmojiPickerProps) => {

    const { className, open, onEmojiSelect, onEmojiClose } = props;

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
            return;
        }
        onEmojiClose();
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

    return <div className={className} ref={ref}>
        <Picker onEmojiSelect={onEmojiSelect}
            autoFocus={true}
            theme={'dark'}
            previewPosition={'none'}
            icons={'solid'}
            maxFrequentRows={2}
            native={true}
            disableAutoFocus={true}/>
    </div>;
};