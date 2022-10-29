import React, {useCallback} from 'react';

import {Badge, Flex, Text} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

import {Group} from './Groups';

interface GroupItemProps {
    group: Group,
    onClick?: (group: Group) => void,
}

export const GroupItem = (props: GroupItemProps) => {

    const { group, onClick } = props;

    const navigate = useNavigate();

    const onGroupClick = useCallback(() => {
        onClick && onClick(group);
        navigate(`/groups/${group.uuid}`);
    }, [onClick, group]);

    return <Flex padding={3}
                 align={'center'}
                 justify={'space-between'}
                 w={'100%'}
                 borderRadius={'6px'}
                 onClick={onGroupClick}
                 _hover={{
                     fontWeight: 'bold',
                     cursor: 'pointer',
                    }}>
        <div className={'text-sm'}>{`#${group.name}`}</div>
    </Flex>;
};
