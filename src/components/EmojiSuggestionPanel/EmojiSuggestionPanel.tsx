import { useEffect, useState } from 'react';

import { emojiMap, getExtendedMatchingEmojiMap } from '@/tools/smileToEmoji';

type EmojiSuggestionPanelProps = {
    query: string | null;
    onSelect: (emoji: string) => void;
    onClose: () => void;
    itemHeight?: number;
    maxItems?: number;
    borderSize?: number;
    hoverColor?: string;
    position?: 'top' | 'bottom';
}

export const EmojiSuggestionPanel = (props: EmojiSuggestionPanelProps) => {
    const {
        query,
        onSelect,
        onClose,
        maxItems = 4
    } = props;

    const [focusedIndex, setFocusedIndex] = useState(0);
    const [availableEmojis, setAvailableEmojis] = useState([] as any[]);

    useEffect(() => {
        if (query === null) {
            setAvailableEmojis([]);
            return;
        }

        if (query.length >= 3) {
            setAvailableEmojis(getExtendedMatchingEmojiMap(query, maxItems));
        }
    }, [query, maxItems]);

    useEffect(() => {
        setFocusedIndex(0);
    }, [availableEmojis]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                setFocusedIndex(Math.max(0, focusedIndex - 1));
            }
            else if (e.key === 'ArrowDown') {
                setFocusedIndex(Math.min(availableEmojis.length - 1, focusedIndex + 1));
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                if (availableEmojis.length > 0) {
                    onSelect(emojiMap[availableEmojis[focusedIndex]]);
                }
            }
            else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedIndex, availableEmojis, onClose, onSelect]);

    return <div className={'absolute bottom-full left-0 z-[1] box-border w-[75%] max-w-[300px] bg-[#1e1e1e]'}>
        {availableEmojis.map((emoji, index) => {
            return <div key={index}
                className={'h-[35px] box-border flex items-center justify-start gap-[10px] px-3 hover:bg-neutral-800 hover:cursor-pointer hover:text-white '
                    + (index === focusedIndex ? 'bg-neutral-600 text-white' : 'bg-neutral-950')}
                onClick={() => {
                    onSelect(emojiMap[emoji]);
                }}>
                <div>{emojiMap[emoji]}</div>
                <div>{emoji}</div>
            </div>;
        })}
    </div>;
};