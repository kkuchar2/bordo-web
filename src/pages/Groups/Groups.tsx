import React, { useCallback, useEffect } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import WithAuth from '../../hoc/WithAuth';

import { GroupItem } from './GroupItem';

import { ButtonWithIcon } from '@/components/chakra/ButtonWithIcon/ButtonWithIcon';
import { CollapseSection } from '@/components/CollapseSection/CollapseSection';
import { showCreateGroupDialog } from '@/components/DialogSystem/readyDialogs';
import { getGroups } from '@/queries/groups';

export interface Group {
    uuid: string,
    name: string,
    leader: string,
    members: string[]
}

const HiddenScrollFlex = styled.div`
  width: 100%;
  height: 0;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Groups = () => {
    const { data: groups, isLoading } = getGroups();

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

    const onCreateGroupClick = useCallback(() => {
        showCreateGroupDialog();
    }, []);

    if (isLoading) {
        return <div className={'flex h-[400px] min-h-[400px] items-center justify-center gap-2'}>
            <Text fontSize={'md'} color={'#dedede'}>{'Loading...'}</Text>
        </div>;
    }

    if (!groups && !isLoading) {
        return <Flex direction={'row'} gap={4} h={'100%'}>
            {'No groups'}
        </Flex>;
    }

    return <CollapseSection className={'flex grow flex-col'}
        title={'Your groups'}
        showIcon={groups && groups.length > 3}
        actionButtonRenderer={() => {
            return <ButtonWithIcon
                title={'Create group'}
                className={'ml-auto'}
                iconSize={20}
                iconColor={'rgba(255,255,255,0.78)'}
                iconColorHover={'white'}
                IconComponent={PlusIcon}
                onClick={onCreateGroupClick}/>;
        }}>
        <HiddenScrollFlex direction={'column'} overflow={'auto'}>
            {groups?.map(group => <GroupItem
                key={group.uuid}
                group={group}
                onClick={() => setSelectedGroup(group)}/>)}
        </HiddenScrollFlex>
    </CollapseSection>;
};

export default WithAuth(Groups, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
