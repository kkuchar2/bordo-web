import React, { useEffect, useMemo, useState } from 'react';

import { List, ListItem, Text } from '@chakra-ui/react';

import { emojiMap, getExtendedMatchingEmojiMap } from '@/tools/smileToEmoji';

interface EmojiSuggestionPanelProps {
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
        itemHeight = 35,
        maxItems = 4,
        borderSize = 0,
        hoverColor = 'blue.400',
        position = 'bottom'
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

    const topPosition = useMemo(() => {
        return -itemHeight * availableEmojis.length - 2 * borderSize;
    }, [itemHeight, borderSize, availableEmojis]);

    return <List w={'75%'}
        maxW={'300px'}
        h={`${itemHeight * availableEmojis.length + 2 * borderSize}px`}
        top={topPosition}
        boxSizing={'border-box'}
        border={`${borderSize}px solid ${'#484848'}`}
        left={0}
        bg={'#1e1e1e'}
        zIndex={1}
        position={'absolute'}>
        {availableEmojis.map((emoji, index) => {
            return <ListItem key={index}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={'10px'}
                pl={3}
                pr={3}
                h={`${itemHeight}px`}
                boxSizing={'border-box'}
                bg={index === focusedIndex ? '#484848' : '#1e1e1e'}
                onClick={() => {
                    onSelect(emojiMap[emoji]);
                }}
                _hover={{
                    bg: hoverColor,
                    cursor: 'pointer'
                }}>
                <Text>{emojiMap[emoji]}</Text>
                <Text>{emoji}</Text>
            </ListItem>;
        })}
    </List>;
};