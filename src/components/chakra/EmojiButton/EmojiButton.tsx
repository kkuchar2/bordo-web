import React, {useCallback, useState} from 'react';

import {Button, ButtonProps, Text} from '@chakra-ui/react';
import {getRandomBaseEmoji} from 'tools/smileToEmoji';

interface EmojiButtonProps {
    title?: string,
    size?: number,
    textSize?: number,
    onClick: () => void
}

export const EmojiButton = (props: EmojiButtonProps & ButtonProps) => {

    const {
        size = 50,
        textSize = 20,
        onClick,
        title,
        ...rest
    } = props;

    const [hovered, setHovered] = useState(false);
    const [emoji, setEmoji] = useState(getRandomBaseEmoji());

    const onMouseEnter = useCallback(() => {
        setEmoji(getRandomBaseEmoji());
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    const sizePx = `${size}px`;

    return <Button width={sizePx}
                   height={sizePx}
                   onMouseEnter={onMouseEnter}
                   onMouseLeave={onMouseLeave}
                   minWidth={0}
                   title={title}
                   filter={!hovered ? 'grayscale(100%)' : 'none'}
                   padding={0}
                   transform={hovered ? 'scale(1.1)' : 'scale(1)'}
                   bg={'none'}
                   _focus={{ bg: 'none' }}
                   _hover={{
                       bg: 'none'
                   }}
                   onClick={onClick}>
        <Text fontSize={`${textSize}px`}>{emoji}</Text>
    </Button>;
};