import React from 'react';

import {Badge, Flex, Text} from '@chakra-ui/react';
import {CollapseSection} from 'components/CollapseSection/CollapseSection';
import {useParams} from 'react-router-dom';

import WithAuth from '../../hoc/WithAuth';
import {getGroup} from '../../queries/groups';

import {GroupMember} from './GroupMember';

export const GroupPreview = () => {

    const params = useParams();

    const { data: group } = getGroup(params.uuid);

    if (!group) {
        return null;
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
                        {group.members.length === 1 ? 'MEMBER' : 'MEMBERS'}
                    </Text>
                </Flex>
            </Flex>
            {/*Group leader*/}
            <Flex direction={'row'} gap={1} align={'center'} justify={'center'}>
                <Text fontSize={'12px'} color={'#848484'} fontWeight={'semibold'}>
                    {'OWNER'}
                </Text>
                <Badge colorScheme={'blue'}>{group.leader}</Badge>
            </Flex>
        </Flex>

        <CollapseSection title={'Locations'}>
            <Flex direction={'column'} gap={4} h={'100%'} p={'20px'}>
                <Text fontSize={'18px'} fontWeight={'semibold'}>
                    {'Locations'}
                </Text>
                <Flex direction={'column'} gap={4} h={'100%'} w={'100%'}>
                    {group.members.map((username) => <Flex key={username} direction={'row'} gap={4} align={'center'}
                                                           justify={'space-between'} bg={'rgba(255,255,255,0.02)'}
                                                           w={'100%'}>
                        <GroupMember username={username} isOwner={username === group.leader}/>
                    </Flex>)}
                </Flex>
            </Flex>
        </CollapseSection>

        <Flex direction={'column'} gap={4} h={'100%'} p={'20px'}>
            <Text fontSize={'18px'} fontWeight={'semibold'}>
                {'Members'}
            </Text>
            <Flex direction={'column'} gap={4} h={'100%'} w={'100%'}>
                {group.members.map((username) => <Flex key={username} direction={'row'} gap={4} align={'center'}
                                                       justify={'space-between'} bg={'rgba(255,255,255,0.02)'}
                                                       w={'100%'}>
                    <GroupMember username={username} isOwner={username === group.leader}/>
                </Flex>)}
            </Flex>
        </Flex>
    </Flex>;
};

export default WithAuth(GroupPreview, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
