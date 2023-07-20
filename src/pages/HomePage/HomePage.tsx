'use client';

import { FC, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { GroupSearchOption, GroupsSearch } from '@/components/Select/GroupsSearch/GroupsSearch';
import WithAuth from '@/hoc/WithAuth';

const HomePage = () => {

    const router = useRouter();

    const onGroupSelected = useCallback((option: GroupSearchOption) => {
        console.log('Selected group: ', option);
        router.push(`/groups/${option.value.groupID}`);
    }, []);

    return <div className={'h-full w-full p-2'}>
        <GroupsSearch onSelect={onGroupSelected}/>
    </div>;
};

HomePage.displayName = 'HomePage';

export default WithAuth(HomePage, {
    name: 'HomePage',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as FC;
