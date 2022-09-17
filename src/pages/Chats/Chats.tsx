import React, {useCallback, useEffect, useState} from 'react';

import {Button, Center, Divider, Flex, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getSocketId} from 'state/middleware/channels';
import {Conversation} from 'state/reducers/conversations/conversationsSlice.types';
import {getConversations} from 'state/services/conversationsService';
import {RootState, useAppDispatch} from 'state/store';

import WithAuth from '../../hoc/WithAuth';
import {getUser} from '../../queries/account';

import {ChatWindow} from './ChatWindow';
import {ConversationList} from './ConversationList';

const Chats = () => {

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const conversations = useSelector((state: RootState) => state.conversations.conversations);

    const { data: user } = getUser();

    const username = user?.username;

    const [isNewConversation, setIsNewConversation] = useState(false);

    const [currentConversation, setCurrentConversation] = useState<Conversation>(conversations.length >= 1 ? conversations[0] : null);

    useEffect(() => {
        dispatch(getConversations(getSocketId()));
    }, []);

    useEffect(() => {
        setCurrentConversation(conversations.length >= 1 ? conversations[0] : null);
    }, [conversations]);

    const onItemClick = useCallback((conversation: Conversation) => {
        setCurrentConversation(conversation);
    }, []);

    const onCreateNewConversation = useCallback(() => {
        setIsNewConversation(true);
    }, []);

    if (!currentConversation && !isNewConversation) {
        return <Flex direction={'column'} height={'100%'} p={3}>
            <Flex align={'center'} p={4}>
                <Text fontSize={'26px'} fontWeight={'bold'}>{t('CHATS')}</Text>
            </Flex>
            <Center flexGrow={1} w={'100%'}>
                <Flex direction={'column'} align={'center'} gap={'20px'}>
                    <Text>{'You have no conversations'}</Text>
                    <Button onClick={onCreateNewConversation}>{'Create new '}</Button>
                </Flex>
            </Center>
        </Flex>;
    }
    else if (!currentConversation && isNewConversation) {
        return <Flex direction={'column'} height={'100vh'} width={'100%'}>
            <Flex align={'center'} p={4}>
                <Text fontSize={'26px'} fontWeight={'bold'}>{t('CHATS')}</Text>
            </Flex>
            <Divider/>
            <Flex h={'100%'}>
                <Divider orientation={'vertical'}/>
                <ChatWindow currentUsername={username} newConversation={true}/>
            </Flex>
        </Flex>;
    }

    return <Flex direction={'column'} height={'100vh'} width={'100%'}>
        <Flex align={'center'} p={4}>
            <Text fontSize={'26px'} fontWeight={'bold'}>{t('CHATS')}</Text>
        </Flex>
        <Divider/>
        <Flex h={'100%'}>
            <ConversationList conversations={conversations}
                              currentUsername={username}
                              onItemClick={onItemClick}
                              activeConversation={currentConversation}/>
            <Divider orientation={'vertical'}/>
            <ChatWindow currentUsername={username}
                        conversation={currentConversation}
                        newConversation={false}/>
        </Flex>
    </Flex>;
};

export default WithAuth(Chats, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
