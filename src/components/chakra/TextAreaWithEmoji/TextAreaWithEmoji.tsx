import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button, Flex, HTMLChakraProps, Text, Textarea } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import runes from 'runes';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

import { DelayedSpinner } from '@/components/chakra/DelayedTransition/DelayedSpinner';
import { EmojiButton } from '@/components/chakra/EmojiButton/EmojiButton';
import { EmojiSuggestionPanel } from '@/components/chakra/EmojiSuggestionPanel/EmojiSuggestionPanel';
import { EmojiPicker, SelectedEmoji } from '@/components/EmojiPicker/EmojiPicker';
import { emojiMap } from '@/tools/smileToEmoji';

interface TextAreaWithEmojiProps {
    name?: string;
    maxLength?: number;
    value?: string;
    uppercaseTitle?: boolean;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    outerPadding?: string;
    toolbarEnabled?: boolean;
    toolbarHeight?: number;
    toolbarBg?: string;
    emojiPickerEnabled?: boolean;
    emojiPickerButtonTextSize?: number;
    enableMaxCharacterCounter?: boolean;
    onSave?: (value: string) => void;
    isSaving?: boolean;
}

export const TextAreaWithEmoji = (props: TextAreaWithEmojiProps & HTMLChakraProps<'textarea'>) => {
    const {
        name,
        uppercaseTitle = true,
        outerPadding = '0',
        maxLength = 300,
        toolbarEnabled = true,
        toolbarHeight = 300,
        toolbarBg = 'white',
        emojiPickerEnabled = true,
        emojiPickerButtonTextSize = 20,
        enableMaxCharacterCounter = true,
        isSaving = false,
        placeholder,
        onChange,
        onSave,
        ...rest
    } = props;

    const [currentValue, setCurrentValue] = useStateWithCallbackLazy<string>(props.value || '');
    const [emojiPanelOpen, setEmojiPanelOpen] = useState(false);
    const [suggestionPanelOpen, setSuggestionPanelOpen] = useState(false);
    const [query, setQuery] = useState('');
    const tracking = useRef({ pending: false, caretPosition: -1 });
    const textAreaRef = useRef(null);

    const { t } = useTranslation();

    const startTracking = useCallback(() => {
        tracking.current = { pending: true, caretPosition: textAreaRef.current.selectionStart };
    }, [textAreaRef.current]);

    const stopTracking = useCallback(() => {
        tracking.current = { pending: false, caretPosition: -1 };
    }, []);

    useEffect(() => {
        setSuggestionPanelOpen(query && query.length >= 3);
    }, [query]);

    const onColonTyped = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!textAreaRef.current) {
            return;
        }

        const caretStart = textAreaRef.current.selectionStart;

        if (!currentValue || currentValue.length === 0 || (currentValue.length > 1 && currentValue[caretStart - 1] === ' ')) {
            startTracking();
        }

    }, [currentValue, textAreaRef.current]);

    const onEmojiSuggestionSelect = useCallback((emoji: string) => {
        textAreaRef.current.focus();
        setSuggestionPanelOpen(false);

        // TODO: Prevent exceeding max length

        const split = runes(currentValue);
        const currentCaretPosition = textAreaRef.current.selectionStart;
        const trackStartPosition = tracking.current.caretPosition;

        const beforeTrack = currentValue.substring(0, trackStartPosition);
        const afterTrack = currentValue.substring(currentCaretPosition, currentValue.length);

        const splitLeft = runes(beforeTrack);
        const splitRight = runes(afterTrack);

        // combine splitLeft + emoji + splitRight
        const result = [...splitLeft, emoji, ...splitRight].join('');

        setCurrentValue(result, () => {
            textAreaRef.current.selectionStart = trackStartPosition + 1;
            textAreaRef.current.selectionEnd = trackStartPosition + 1;
        });

        stopTracking();

    }, [currentValue, textAreaRef.current, query]);

    const onInnerChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(e.target.value, () => {
        });
        props.onChange?.(e);
    }, [props.onChange]);

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === ':') {
            onColonTyped(e);
        }

        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && suggestionPanelOpen) {
            e.preventDefault();
        }

        if ((e.key === ' ' || e.key === 'Enter') && currentValue && currentValue.length > 0) {
            if (!suggestionPanelOpen) {
                stopTracking();
            }

            const currentCaretPosition = textAreaRef.current.selectionStart;

            const lastSpace = currentValue.lastIndexOf(' ', currentCaretPosition - 1);
            const lastEnter = currentValue.lastIndexOf('\n');

            const startingIndex = lastSpace === currentCaretPosition ? -1 : Math.max(lastSpace, lastEnter);
            const text = startingIndex > -1 ? currentValue.slice(startingIndex + 1, currentCaretPosition) : currentValue.slice(0, currentCaretPosition);
            const emoji = text in emojiMap ? emojiMap[text] : null;

            if (emoji) {
                const left = currentValue.slice(0, currentCaretPosition - text.length);
                const right = currentValue.slice(currentCaretPosition, currentValue.length);
                const result = left + emoji + right;
                setCurrentValue(result, () => {
                    textAreaRef.current.selectionStart = currentCaretPosition - text.length + 1;
                    textAreaRef.current.selectionEnd = currentCaretPosition - text.length + 1;
                });
            }
        }
        props.onKeyDown?.(e);
    }, [currentValue, props.onKeyDown, suggestionPanelOpen, textAreaRef.current]);

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
        if (currentValue && currentValue.length + emoji.native.length > maxLength) {
            return;
        }

        const split = runes(currentValue);
        const currentCaretPosition = textAreaRef.current.selectionStart;

        if (split.length === 0) {
            setCurrentValue(emoji.native, () => {
                textAreaRef.current.selectionStart = 1;
                textAreaRef.current.selectionEnd = 1;
                textAreaRef.current.focus();
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
            textAreaRef.current.selectionStart = currentCaretPosition + emoji.native.length;
            textAreaRef.current.selectionEnd = currentCaretPosition + emoji.native.length;
            textAreaRef.current.focus();
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

    return <Flex direction={'column'} p={outerPadding} gap={'10px'}>
        {name ? <Text fontSize={'13px'}
            fontWeight={'semibold'}
            color={'rgba(255,255,255,0.73)'}
            textTransform={uppercaseTitle ? 'uppercase' : 'none'}>
            {`${name}:`}
        </Text> : null}

        <Box position={'relative'}
            w={rest.w}
            borderRadius={rest.borderRadius}
            pb={'50px'}
            bg={rest.bg ?? 'none'}>
            {/* Main TextArea */}
            <Textarea
                {...rest}
                bg={'none'}
                _hover={{
                    bg: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
                _active={{
                    bg: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
                _focus={{
                    bg: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
                placeholder={placeholder}
                borderBottomRadius={0}
                maxLength={maxLength}
                spellCheck={false}
                ref={textAreaRef}
                onKeyDown={onKeyDown}
                onChange={onInnerChange}
                value={currentValue ? currentValue : ''}
            />

            {/* Manual emoji picker */}
            <EmojiPicker
                position={'absolute'}
                right={0}
                zIndex={2}
                open={emojiPanelOpen}
                onEmojiSelect={onManualEmojiSelect}
                onEmojiClose={onEmojiPickerClosed}/>

            {/* Emoji suggestion panel */}
            {suggestionPanelOpen && <EmojiSuggestionPanel
                query={query}
                onClose={() => setSuggestionPanelOpen(false)}
                onSelect={onEmojiSuggestionSelect}/>}

            {/* Toolbar */}
            {toolbarEnabled ?
                <Flex position={'absolute'}
                    width={'100%'}
                    display={'flex'}
                    align={'center'}
                    borderBottomRadius={rest.borderRadius}
                    bg={toolbarBg}
                    height={`${toolbarHeight}px`}
                    zIndex={1}
                    right={0}
                    bottom={0}>
                    {/* Button to toggle manual emoji picker */}
                    {enableMaxCharacterCounter ?
                        <Text position={'absolute'}
                            bottom={'15px'}
                            fontSize={'14px'}
                            fontWeight={'semibold'}
                            color={'rgba(255,255,255,0.5)'}
                            left={'15px'}>{`${remaining}`}</Text> : null}

                    <Flex flexGrow={1} justify={'flex-end'} align={'center'}>
                        {props.value !== currentValue &&
                            <Button h={'30px'} fontSize={'12px'} disabled={isSaving}
                                onClick={onSaveButtonClick}>
                                {t('SAVE')}
                            </Button>}

                        <DelayedSpinner pending={isSaving}/>

                        {/* Button to toggle manual emoji picker */}
                        {emojiPickerEnabled ?
                            <EmojiButton
                                title={t('PICK_EMOJI')}
                                textSize={emojiPickerButtonTextSize}
                                onClick={onEmojiButtonPressed}/> : null}
                    </Flex>
                </Flex> : null}
        </Box>
    </Flex>;
};