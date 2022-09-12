import React from 'react';

import {Avatar, Flex, List, ListItem, Text} from '@chakra-ui/react';
import {Conversation} from 'state/reducers/conversations/conversationsSlice.types';

import {getConversationName} from './util';

interface ConversationListProps {
    conversations: Conversation[],
    currentUsername: string,
    onItemClick: (conversation: Conversation) => void,
    activeConversation: Conversation | null
}

export const ConversationList = (props: ConversationListProps) => {

    const { conversations, currentUsername, onItemClick, activeConversation } = props;

    return <List w={'450px'} spacing={'5px'} height={'100%'}>
        {conversations.map((conversation: Conversation) => (
            <ListItem key={conversation.channel_name} onClick={() => onItemClick(conversation)}>
                <Flex align={'center'}
                      bg={activeConversation.channel_name === conversation.channel_name ? 'rgba(255,255,255,0.1)' : 'transparent'}
                      _hover={{
                          bg: 'rgba(255,255,255,0.1)',
                          cursor: 'pointer'
                      }}
                      p={3} gap={'10px'}>
                    <Avatar name={'k'}
                            width={'60px'}
                            height={'60px'}/>
                    <Flex direction={'column'} gap={'10px'}>
                        <Text color={'white'}>{getConversationName(currentUsername, conversation, false)}</Text>
                        <Text fontSize={'12px'}>{'Emcia: No i to ja rozumiem 😊'}</Text>
                    </Flex>
                </Flex>
            </ListItem>
        ))}
    </List>;
};