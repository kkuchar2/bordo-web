import React, { useCallback } from 'react';

import {Badge, Flex, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

import {deleteGroup, getGroup, subscribeToGroup, unsubscribeFromGroup} from '../../queries/groups';

import {getUser} from 'queries/account';
import { GroupMember } from './GroupMember';
import WithAuth from "../../hoc/WithAuth";


export const GroupPreview = () => {

    const params = useParams();

    const {
        data: group,
        isError: groupError,
    } = getGroup(params.uuid);

    const { data: user } = getUser();

    const { mutate: subscribeToGroupMutate } = subscribeToGroup();
    const { mutate: unsubscribeFromGroupMutate } = unsubscribeFromGroup();
    const { mutate: deleteGroupMutate} = deleteGroup();

    const onSubscribeClick = useCallback(() => {
        console.log('Subscribing to group ', group, 'user: ', user);
        subscribeToGroupMutate({
            group_uuid: group.uuid,
        });
    }, [user, group]);

    const onUnsubscribeClick = useCallback(() => {
        console.log('Unsubscribing from group ', group, 'user: ', user);
        unsubscribeFromGroupMutate({
            group_uuid: group.uuid,
        });
    }, [user, group]);

    const onDeleteGroupClick = useCallback(() => {
        console.log('Deleting group ', group, 'user: ', user);
        deleteGroupMutate({
            group_uuid: group.uuid,
        });
    }, [user, group]);

    if (!group || !user) {
        return null;
    }

    console.log('Group: ', group);
    console.log('Group error: ', groupError);

    if (groupError) {
        return <div className={'w-full h-full p-2 flex flex-col items-center justify-center'}>
            <div>Group does not exist</div>
        </div>;
    }

    return <Flex direction={'column'} gap={4} h={'100%'} flexGrow={1} maxW={'1000px'}>
        {/*Header with group name*/}
        <Flex direction={'row'} gap={4} align={'center'} justify={'space-between'} pt={'40px'} pb={'40px'} pl={4} pr={4}
              bg={'rgba(255,255,255,0.02)'}>
            <Flex direction={'row'} gap={4} align={'center'}>
                {/*Group name*/}
                <Text fontSize={'24px'} fontWeight={'semibold'}>
                    {group.name}
                </Text>
                {/*Members */}
                <Flex direction={'row'} gap={1} align={'center'} justify={'center'}>
                    <Badge colorScheme={'green'}>{group.members.length}</Badge>
                    <Text fontSize={'12px'} color={'#848484'} fontWeight={'semibold'}>
                        {group.members.length === 1 ? 'SUBSCRIBER' : 'SUBSCRIBERS'}
                    </Text>
                </Flex>
                {/*Delete button if current user is the leader*/}
                {group.leader === user.username && <Flex  gap={1} align={'end'} justify={'end'} ml={'auto'}>
                    <button
                        className={'bg-red-900/30 text-white px-2 py-2 font-semibold hover:bg-red-900/50 rounded-md'}
                        onClick={onDeleteGroupClick}>
                        Delete group
                    </button>
                </Flex>}

                {/*Subscribe button if not a member*/}
                {!group.members.includes(user.username) &&
                    <Flex direction={'row'} gap={1} align={'center'} justify={'center'}>
                        <button
                            className={'bg-white/10 text-white px-4 py-2 font-semibold hover:bg-white/20 text-white/80 hover:text-white/100'}
                            onClick={onSubscribeClick}>
                            Subscribe
                        </button>
                    </Flex>
                }
                {/*Unsubscribe button if a member and not the owner*/}
                {group.members.includes(user.username) && group.leader !== user.username &&
                    <Flex direction={'row'} gap={1} align={'center'} justify={'center'}>
                        <button
                            className={'bg-white/10 text-white px-4 py-2 font-semibold hover:bg-white/20 text-white/80 hover:text-white/100'}
                            onClick={onUnsubscribeClick}>
                            Unsubscribe
                        </button>
                    </Flex>
                }
            </Flex>
            {/*Group leader*/}
            <Flex direction={'row'} gap={1} align={'center'} justify={'center'}>
                <Text fontSize={'12px'} color={'#848484'} fontWeight={'semibold'}>
                    {'OWNER'}
                </Text>
                <Badge colorScheme={'blue'}>{group.leader}</Badge>
            </Flex>
        </Flex>

        {group.leader === user.username &&
        <Flex direction={'column'} gap={4} h={'100%'} p={'20px'}>
            <Text fontSize={'18px'} fontWeight={'semibold'}>
                {'Subscribers'}
            </Text>
            <Flex direction={'column'} gap={4} h={'100%'} w={'100%'}>
                {group.members.map((username) => <Flex key={username} direction={'row'} gap={4} align={'center'}
                                                       justify={'space-between'} bg={'rgba(255,255,255,0.02)'}
                                                       w={'100%'}>
                    <GroupMember username={username} isOwner={username === group.leader} groupID={group.uuid}/>
                </Flex>)}
            </Flex>
        </Flex>}
    </Flex>;
};

export default WithAuth(GroupPreview, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
