import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button, Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

import { EmojiButton } from '@/components/chakra/EmojiButton/EmojiButton';
import { EmojiSuggestionPanel } from '@/components/chakra/EmojiSuggestionPanel/EmojiSuggestionPanel';
import { EmojiPicker } from '@/components/EmojiPicker/EmojiPicker';
import { emojiMap } from '@/tools/smileToEmoji';

interface InputWithEmojiProps {
    name?: string;
    uppercaseTitle?: boolean;
    outerPadding?: string;
    toolbarEnabled?: boolean;
    toolbarHeight?: number;
    toolbarBg?: string;
    emojiPickerEnabled?: boolean;
    emojiPickerButtonTextSize?: number;
    enableMaxCharacterCounter?: boolean;
    actionButtonText?: string;
    focusOnMount?: boolean;
    clearOnEnter?: boolean;
    onEnter?: (currentValue: string) => void;
}

export const InputWithEmoji = (props: InputWithEmojiProps & InputProps) => {
    const {
        name,
        uppercaseTitle = true,
        outerPadding = '0.5rem',
        maxLength = 300,
        toolbarEnabled = true,
        toolbarBg = 'white',
        emojiPickerEnabled = true,
        emojiPickerButtonTextSize = 20,
        enableMaxCharacterCounter = true,
        actionButtonText = 'Send',
        clearOnEnter = false,
        focusOnMount = false,
        onEnter = () => {
        },
        ...rest
    } = props;

    const [currentValue, setCurrentValue] = useStateWithCallbackLazy(props.value ? props.value as string : '');
    const [emojiPanelOpen, setEmojiPanelOpen] = useState(false);
    const [suggestionPanelOpen, setSuggestionPanelOpen] = useState(false);
    const [query, setQuery] = useState('');
    const tracking = useRef({ pending: false, caretPosition: -1 });
    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const startTracking = useCallback(() => {
        tracking.current = { pending: true, caretPosition: inputRef.current.selectionStart };
    }, [inputRef.current]);

    const stopTracking = useCallback(() => {
        tracking.current = { pending: false, caretPosition: -1 };
    }, []);

    useEffect(() => {
        if (focusOnMount && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setSuggestionPanelOpen(query && query.length >= 3);
    }, [query]);

    const onColonTyped = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!inputRef.current) {
            return;
        }

        const v = currentValue as string;
        const caretStart = inputRef.current.selectionStart;

        if (!v || v.length === 0 || (v.length > 1 && v[caretStart - 1] === ' ')) {
            startTracking();
        }

    }, [currentValue, inputRef.current]);

    const onEmojiSuggestionSelect = useCallback((emoji) => {
        inputRef.current.focus();
        setSuggestionPanelOpen(false);
        const v = currentValue as string;

        if (!v || v.length === 0) {
            setCurrentValue(emoji, () => {
                inputRef.current.selectionStart = 1;
                inputRef.current.selectionEnd = 1;
            });
            return;
        }
        const currentCaretPosition = inputRef.current.selectionStart;
        const trackStartPosition = tracking.current.caretPosition;

        const left = v.slice(0, trackStartPosition);
        const right = currentCaretPosition === v.length - 1 ? '' : v.slice(currentCaretPosition, v.length);
        const result = left + emoji + right;

        setCurrentValue(result, () => {
            inputRef.current.selectionStart = trackStartPosition + 1;
            inputRef.current.selectionEnd = trackStartPosition + 1;
        });

        stopTracking();

    }, [currentValue, inputRef.current]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value, () => {
        });
        props.onChange?.(e);
    }, [props.onChange]);

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const v = currentValue as string;

        if (e.key === ':') {
            onColonTyped(e);
        }

        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && suggestionPanelOpen) {
            e.preventDefault();
        }

        if (e.key === 'Enter' && !suggestionPanelOpen) {
            onEnter?.(currentValue);

            if (clearOnEnter) {
                setCurrentValue('', () => {
                });
            }

            return;
        }

        if (e.key === ' ' && v && v.length > 0) {
            if (!suggestionPanelOpen) {
                stopTracking();
            }

            if (!inputRef.current) {
                return;
            }

            const caretStart = inputRef.current.selectionStart || 0;
            const lastSpace = v.lastIndexOf(' ');
            const lastEnter = v.lastIndexOf('\n');
            const startingIndex = lastSpace === caretStart ? -1 : Math.max(lastSpace, lastEnter);
            const text = startingIndex > -1 ? v.slice(startingIndex + 1, caretStart) : v.slice(0, caretStart);
            const emoji = text in emojiMap ? emojiMap[text] : null;

            if (emoji) {
                const left = v.slice(0, caretStart - text.length);
                const right = v.slice(caretStart, v.length);
                const result = left + emoji + right;

                setCurrentValue(result, () => {
                    inputRef.current.selectionStart = caretStart - text.length + 1;
                    inputRef.current.selectionEnd = caretStart - text.length + 1;
                });
            }
        }
        props.onKeyDown?.(e);
    }, [currentValue, props.onKeyDown, suggestionPanelOpen, inputRef.current, clearOnEnter]);

    useEffect(() => {
        const v = currentValue as string;

        if (!inputRef.current || !v || v === '') {
            stopTracking();
            return;
        }

        const currentCaretPosition = inputRef.current.selectionStart || 0;
        const trackStartPosition = tracking.current.caretPosition;

        setQuery(v.slice(trackStartPosition, currentCaretPosition));
    }, [tracking.current, inputRef.current, currentValue]);

    const onEmojiSelect = useCallback((emoji: any) => {
        const v = currentValue as string;

        if (!v || v.length === 0) {
            setCurrentValue(emoji.native, () => {
            });
            return;
        }

        if (!inputRef.current) {
            return;
        }

        const curInput = inputRef.current;

        const currentCaretPosition = curInput.selectionStart || 0;
        const left = v.slice(0, currentCaretPosition);
        const right = v.slice(currentCaretPosition, v.length);
        const result = left + emoji.native + right;

        setCurrentValue(result, () => {
            if (!inputRef.current) {
                return;
            }
            inputRef.current.selectionStart = currentCaretPosition + 2;
            inputRef.current.selectionEnd = currentCaretPosition + 2;
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
        // TODO
    }, []);

    return <Flex direction={'column'} p={outerPadding} gap={'10px'}>
        {name ? <Text fontSize={'13px'}
            fontWeight={'semibold'}
            color={'rgba(255,255,255,0.73)'}
            textTransform={uppercaseTitle ? 'uppercase' : 'none'}>
            {`${name}:`}
        </Text> : null}

        <Box position={'relative'}
            w={rest.w}
            h={rest.h}
            borderRadius={rest.borderRadius}
            pb={'50px'}
            bg={rest.bg ?? 'none'}>
            {/* Main Input */}
            <Input
                {...rest}
                borderBottomRadius={0}
                ref={inputRef}
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={currentValue}
            />

            {/* Manual emoji picker */}
            <EmojiPicker
                position={'absolute'}
                right={0}
                bottom={'50px'}
                zIndex={2}
                open={emojiPanelOpen}
                onEmojiSelect={onEmojiSelect}
                onEmojiClose={onEmojiPickerClosed}/>

            {/* Emoji suggestion panel */}
            {suggestionPanelOpen ? <EmojiSuggestionPanel
                position={'top'}
                query={query}
                onClose={() => setSuggestionPanelOpen(false)}
                onSelect={onEmojiSuggestionSelect}/> : null}

            {/* Toolbar */}
            {toolbarEnabled ?
                <Flex position={'absolute'}
                    display={'flex'}
                    align={'center'}
                    borderBottomRadius={rest.borderRadius}
                    bg={toolbarBg}
                    height={'100%'}
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
                        <Button h={'35px'}
                            pl={'20px'}
                            pr={'20px'}
                            fontSize={'12px'}
                            borderRadius={0}
                            onClick={onSaveButtonClick}>
                            {actionButtonText}
                        </Button>

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