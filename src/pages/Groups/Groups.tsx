import React, { useEffect } from 'react';

import { Flex} from '@chakra-ui/react';
import { getGroups} from 'queries/groups';
import { useParams} from 'react-router-dom';

import WithAuth from '../../hoc/WithAuth';

import {GroupList} from './GroupList';

export interface Group {
    uuid: string,
    name: string,
    leader: string,
    members: string[],
}

const Groups = () => {

    const {
        data: groups,
        isLoading
    } = getGroups();

    const [selectedGroup, setSelectedGroup] = React.useState(null);

    const params = useParams();

    useEffect(() => {
        if (groups && groups.length > 0) {
            if (params.uuid) {
                const group = groups.find((group) => group.uuid === params.uuid);
                if (group) {
                    console.log('Setting selected group to', group);
                    setSelectedGroup(group);
                }
                else {
                    setSelectedGroup(groups[0]);
                }
            }
        }
    }, [groups]);

    if (isLoading)
    {
        return <Flex direction={'row'} gap={4} h={'100%'}>
            {'Loading'}
        </Flex>;
    }

    if (!groups && !isLoading) {
        return <Flex direction={'row'} gap={4} h={'100%'}>
            {'No groups'}
        </Flex>;
    }

    return <Flex direction={'row'} gap={4} h={'100%'}>
        <GroupList groups={groups} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>
    </Flex>;
};

export default WithAuth(Groups, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
