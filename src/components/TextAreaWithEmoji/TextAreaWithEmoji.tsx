import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import runes from 'runes';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

import { DelayedSpinner } from '@/components/DelayedTransition/DelayedSpinner';
import { EmojiButton } from '@/components/EmojiButton/EmojiButton';
import { EmojiPicker, SelectedEmoji } from '@/components/EmojiPicker/EmojiPicker';
import { EmojiSuggestionPanel } from '@/components/EmojiSuggestionPanel/EmojiSuggestionPanel';
import { emojiMap } from '@/tools/smileToEmoji';

interface TextAreaWithEmojiProps {
    id?: string;
    name?: string;
    maxLength?: number;
    value?: string;
    uppercaseTitle?: boolean;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    toolbarEnabled?: boolean;
    emojiPickerEnabled?: boolean;
    emojiPickerButtonTextSize?: number;
    enableMaxCharacterCounter?: boolean;
    onSave?: (value: string) => void;
    isSaving?: boolean;
}

export const TextAreaWithEmoji = (props: TextAreaWithEmojiProps) => {
    const {
        id,
        name,
        maxLength = 300,
        toolbarEnabled = true,
        emojiPickerEnabled = true,
        emojiPickerButtonTextSize = 20,
        enableMaxCharacterCounter = true,
        isSaving = false,
        placeholder,
        onKeyDown,
        onSave,
    } = props;

    const [currentValue, setCurrentValue] = useStateWithCallbackLazy<string>(props.value || '');
    const [emojiPanelOpen, setEmojiPanelOpen] = useState(false);
    const [suggestionPanelOpen, setSuggestionPanelOpen] = useState(false);
    const [query, setQuery] = useState<string | null>('');

    const tracking = useRef({ pending: false, caretPosition: -1 });
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const { t } = useTranslation();

    const startTracking = useCallback(() => {
        if (!textAreaRef.current) {
            return;
        }

        tracking.current = { pending: true, caretPosition: textAreaRef.current.selectionStart };
    }, [textAreaRef.current]);

    const stopTracking = useCallback(() => {
        tracking.current = { pending: false, caretPosition: -1 };
    }, []);

    useEffect(() => {
        setSuggestionPanelOpen(query !== null && query.length > 0);
    }, [query]);

    const onColonTyped = useCallback(() => {
        if (!textAreaRef.current) {
            return;
        }

        const caretStart = textAreaRef.current.selectionStart;

        if (!currentValue || currentValue.length === 0 || (currentValue.length > 1 && currentValue[caretStart - 1] === ' ')) {
            startTracking();
        }

    }, [currentValue, textAreaRef.current]);

    const onEmojiSuggestionSelect = useCallback((emoji: string) => {

        if (!textAreaRef.current) {
            return;
        }

        const textArea = textAreaRef.current;

        textArea.focus();

        setSuggestionPanelOpen(false);

        // TODO: Prevent exceeding max length

        const currentCaretPosition = textAreaRef.current.selectionStart;
        const trackStartPosition = tracking.current.caretPosition;

        const beforeTrack = currentValue.substring(0, trackStartPosition);
        const afterTrack = currentValue.substring(currentCaretPosition, currentValue.length);

        const splitLeft = runes(beforeTrack);
        const splitRight = runes(afterTrack);

        // combine splitLeft + emoji + splitRight
        const result = [...splitLeft, emoji, ...splitRight].join('');

        setCurrentValue(result, () => {
            textArea.selectionStart = trackStartPosition + 1;
            textArea.selectionEnd = trackStartPosition + 1;
        });

        stopTracking();

    }, [currentValue, textAreaRef.current, query]);

    const onInnerChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(e.target.value, () => {
        });
        props.onChange?.(e);
    }, [props.onChange]);

    const innerOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (!textAreaRef.current) {
            return;
        }

        if (e.key === ':') {
            onColonTyped();
        }

        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && suggestionPanelOpen) {
            e.preventDefault();
        }

        if ((e.key === ' ' || e.key === 'Enter') && currentValue && currentValue.length > 0) {
            if (!suggestionPanelOpen) {
                stopTracking();
            }

            const textArea = textAreaRef.current;

            const currentCaretPosition = textArea.selectionStart;

            const lastSpace = currentValue.lastIndexOf(' ', currentCaretPosition - 1);
            const lastEnter = currentValue.lastIndexOf('\n');

            const startingIndex = lastSpace === currentCaretPosition ? -1 : Math.max(lastSpace, lastEnter);
            const text = startingIndex > -1 ? currentValue.slice(startingIndex + 1, currentCaretPosition)
                : currentValue.slice(0, currentCaretPosition);
            const emoji = text in emojiMap ? emojiMap[text] : null;

            if (emoji) {
                const left = currentValue.slice(0, currentCaretPosition - text.length);
                const right = currentValue.slice(currentCaretPosition, currentValue.length);
                const result = left + emoji + right;
                setCurrentValue(result, () => {
                    textArea.selectionStart = currentCaretPosition - text.length + 1;
                    textArea.selectionEnd = currentCaretPosition - text.length + 1;
                });
            }
        }
        onKeyDown?.(e);
    }, [currentValue, onKeyDown, suggestionPanelOpen, textAreaRef.current]);

    useEffect(() => {
        if (!textAreaRef.current || !currentValue || currentValue === '') {
            stopTracking();
            return;
        }

        const currentCaretPosition = textAreaRef.current.selectionStart;
        const trackStartPosition = tracking.current.caretPosition;

        setQuery(currentValue.slice(trackStartPosition, currentCaretPosition));
    }, [tracking.current, textAreaRef.current, currentValue]);

    const onManualEmojiSelect = useCallback((emoji: SelectedEmoji) => {
        if (!textAreaRef.current) {
            return;
        }

        if (currentValue && currentValue.length + emoji.native.length > maxLength) {
            return;
        }

        const textArea = textAreaRef.current;

        const split = runes(currentValue);
        const currentCaretPosition = textArea.selectionStart;

        if (split.length === 0) {
            setCurrentValue(emoji.native, () => {
                textArea.selectionStart = 1;
                textArea.selectionEnd = 1;
                textArea.focus();
            });
            return;
        }

        let sum = 0;
        let targetIndex = split.length;

        for (let i = 0; i < split.length; i++) {
            const len = split[i].length;
            if (len + sum >= currentCaretPosition) {
                targetIndex = i + 1;
                break;
            }
            sum += len;
        }
        split.splice(targetIndex, 0, emoji.native);
        const result = split.join('');

        setCurrentValue(result, () => {
            textArea.selectionStart = currentCaretPosition + emoji.native.length;
            textArea.selectionEnd = currentCaretPosition + emoji.native.length;
            textArea.focus();
        });
    }, [currentValue]);

    const remaining = useMemo(() => {
        return currentValue ? maxLength - currentValue.length : maxLength;
    }, [currentValue]);

    const toggleEmojiPicker = useCallback(() => {
        setEmojiPanelOpen(!emojiPanelOpen);
    }, [emojiPanelOpen]);

    const onEmojiPickerClosed = useCallback(() => {
        setEmojiPanelOpen(false);
    }, []);

    const onEmojiButtonPressed = useCallback(() => {
        toggleEmojiPicker();
    }, []);

    const onSaveButtonClick = useCallback(() => {
        onSave?.(currentValue);
    }, [onSave, currentValue]);

    return <div className={'flex flex-col gap-[10px]'}>
        {name && <div className={'text-sm font-bold text-white/60'}>
            {`${name}:`}
        </div>}

        <div className={'relative h-[200px] bg-white/10'}>
            <textarea
                ref={textAreaRef}
                id={id}
                className={'text-md h-full w-full resize-none bg-transparent bg-none p-3 font-medium text-white/80 outline-none'}
                placeholder={placeholder}
                maxLength={maxLength}
                spellCheck={false}
                onKeyDown={innerOnKeyDown}
                onChange={onInnerChange}
                value={currentValue || ''}
            />

            <EmojiPicker
                className={'absolute right-0 z-[2]'}
                open={emojiPanelOpen}
                onEmojiSelect={onManualEmojiSelect}
                onEmojiClose={onEmojiPickerClosed}/>

            {suggestionPanelOpen && <EmojiSuggestionPanel
                query={(query || '').toLowerCase()}
                onClose={() => setSuggestionPanelOpen(false)}
                onSelect={onEmojiSuggestionSelect}/>}

            {toolbarEnabled &&
                <div className={'absolute bottom-0 right-0 flex w-full items-center'}>
                    {enableMaxCharacterCounter &&
                        <div className={'absolute bottom-[15px] left-[15px] text-sm font-semibold text-white/50'}>
                            {`${remaining}`}
                        </div>}

                    <div className={'flex grow items-center justify-end'}>
                        {props.value !== currentValue &&
                            <button
                                className={'rounded-full bg-neutral-700 px-4 py-1 text-sm font-semibold hover:bg-neutral-600'}
                                disabled={isSaving}
                                onClick={onSaveButtonClick}>
                                {t('SAVE')}
                            </button>}

                        <DelayedSpinner pending={isSaving}/>

                        {emojiPickerEnabled ?
                            <EmojiButton
                                title={t('PICK_EMOJI')}
                                textSize={emojiPickerButtonTextSize}
                                onClick={onEmojiButtonPressed}/> : null}
                    </div>
                </div>}
        </div>
    </div>;
};