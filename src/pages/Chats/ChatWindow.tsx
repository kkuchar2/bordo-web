import React, {useCallback} from 'react';

import {Box, Flex, Text} from '@chakra-ui/react';
import {InputWithEmoji} from 'components/chakra/InputWithEmoji/InputWithEmoji';
import {MultiUserSelect} from 'components/Select/MultiUserSelect/MultiUserSelect';
import {getSocketId} from 'state/middleware/channels';
import {Conversation} from 'state/reducers/conversations/conversationsSlice.types';
import {sendMessageCreateConversation, sendMessageToExistingConversation} from 'state/services/conversationsService';
import {useAppDispatch} from 'state/store';

import {UserProfile} from '../../queries/account/types';

interface ChatFullWindowProps {
    conversation?: Conversation | null;
    newConversation: boolean;
    currentUsername: string
}

export interface UserSearchOption {
    readonly value: {
        username: string;
        profile: UserProfile
    },
    readonly label: string;
}

export const ChatWindow = (props: ChatFullWindowProps) => {

    const { conversation, currentUsername, newConversation } = props;

    const dispatch = useAppDispatch();

    const onInputEnterPress = useCallback((currentValue: string) => {
        if (newConversation) {
            dispatch(sendMessageCreateConversation(currentValue, getSocketId()));
        }
        else {
            dispatch(sendMessageToExistingConversation(conversation, currentValue, getSocketId()));
        }
    }, [newConversation]);

    return <Flex direction={'column'} w={'100%'} h={'100%'} position={'relative'}>
        <Flex p={4} direction={'column'} gap={'10px'}>
            <Text>{'To:'}</Text>
            <MultiUserSelect/>
        </Flex>
        <Flex w={'100%'} flexGrow={1} align={'flex-end'}>
            <Box w={'100%'} p={3}>
                <InputWithEmoji
                    focusOnMount={true}
                    placeholder={'Write message'}
                    w={'100%'}
                    h={'50px'}
                    bg={'#252525'}
                    _hover={{ bg: '#252525' }}
                    _active={{ bg: '#252525' }}
                    _focus={{ bg: '#252525' }}
                    _placeholder={{
                        color: '#868686',
                        fontWeight: 'semibold'
                    }}
                    borderRadius={0}
                    maxLength={-1}
                    toolbarEnabled={true}
                    toolbarBg={'none'}
                    emojiPickerEnabled={true}
                    emojiPickerButtonTextSize={20}
                    enableMaxCharacterCounter={false}
                    fontSize={'sm'}
                    resize={'none'}
                    clearOnEnter={true}
                    variant={'filled'}
                    focusBorderColor={'transparent'}
                    onEnter={onInputEnterPress}
                />
            </Box>
        </Flex>
    </Flex>;
};