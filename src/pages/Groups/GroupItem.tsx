import React, {useCallback} from 'react';

import {Badge, Flex, Text} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

import {Group} from './Groups';

interface GroupItemProps {
    group: Group,
    selected?: boolean,
    onClick?: (group: Group) => void,
}

export const GroupItem = (props: GroupItemProps) => {

    const { group, selected, onClick } = props;

    const navigate = useNavigate();

    const onGroupClick = useCallback(() => {
        onClick && onClick(group);
        navigate(`/groups/${group.uuid}`);
    }, [onClick, group]);

    return <Flex backgroundColor={selected ? '#3a3a3a' : 'none'}
                 padding={3}
                 borderBottom={`1px solid ${'rgba(255,255,255,0.1)'}`}
                 align={'center'}
                 justify={'space-between'}
                 w={'300px'}
                 onClick={onGroupClick}
                 _hover={{
                     backgroundColor: '#3a3a3a',
                     cursor: 'pointer',
                    }}>
        <Text fontWeight={'semibold'}>
            {group.name}
        </Text>
        {/*Members */}
        <Flex direction={'row'} gap={1} align={'center'} justify={'center'} ml={'auto'}>
            <Badge colorScheme={'green'}>{group.members.length}</Badge>
            <Text fontSize={'12px'} color={'#848484'} fontWeight={'semibold'}>
                { group.members.length === 1 ? 'MEMBER' : 'MEMBERS'}
            </Text>
        </Flex>
    </Flex>;
};
