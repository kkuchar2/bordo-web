import { useCallback, useState } from 'react';

import { getRandomBaseEmoji } from '@/tools/smileToEmoji';

type EmojiButtonProps = {
    title?: string,
    textSize?: number,
    onClick: () => void
}

export const EmojiButton = (props: EmojiButtonProps) => {

    const { onClick, title } = props;

    const [emoji, setEmoji] = useState(getRandomBaseEmoji());

    const onMouseEnter = useCallback(() => {
        setEmoji(getRandomBaseEmoji());
    }, []);

    return <button
        className={'h-[50px] w-[50px] bg-transparent text-xl hover:scale-125'}
        onMouseEnter={onMouseEnter}
        title={title}
        onClick={onClick}>
        {emoji}
    </button>;
};