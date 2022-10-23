import React, {useCallback} from 'react';

import { Flex, Text} from '@chakra-ui/react';
import {PlusIcon} from '@heroicons/react/24/solid';
import {ButtonWithIcon} from 'components/chakra/ButtonWithIcon/ButtonWithIcon';
import {showCreateGroupDialog} from 'components/DialogSystem/readyDialogs';
import styled from 'styled-components';

import {GroupItem} from './GroupItem';
import {Group} from './Groups';

interface GroupListProps {
    groups: Group[],
    selectedGroup: Group,
    setSelectedGroup: (group: Group) => void,
}

const HiddenScrollFlex = styled(Flex)`
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GroupList = (props: GroupListProps) => {

    const { groups, selectedGroup, setSelectedGroup } = props;

    const onCreateGroupClick = useCallback(() => {
        showCreateGroupDialog();
    }, []);

    return <Flex direction={'column'} gap={1} h={'100%'}>
        <Flex p={4} align={'center'} justify={'space-between'} w={'300px'}>
            <Text fontSize={'2xl'} color={'#dedede'} fontWeight={'semibold'}>
                {'Groups'}
            </Text>
            <ButtonWithIcon
                title={'Create Group'}
                width={'40px'}
                height={'40px'}
                bg={'rgba(255,255,255,0.09)'}
                _hover={{ bg: 'rgba(255,255,255,0.2)' }}
                _active={{ bg: 'rgba(255,255,255,0.2)' }}
                _focus={{ bg: 'rgba(255,255,255,0.2)' }}
                padding={0}
                iconSize={20}
                iconColor={'rgba(255,255,255,0.78)'}
                iconColorHover={'white'}
                IconComponent={PlusIcon}
                onClick={onCreateGroupClick}
            />
        </Flex>
        <HiddenScrollFlex direction={'column'} flexGrow={1} overflow={'auto'}>
            {groups?.map(group => <GroupItem
                key={group.uuid}
                group={group}
                onClick={() => setSelectedGroup(group)}
                selected={selectedGroup ? group.uuid === selectedGroup.uuid : false} />)}
        </HiddenScrollFlex>
    </Flex>;
};