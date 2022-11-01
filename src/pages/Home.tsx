import React, {useCallback} from 'react';

import WithAuth from '../hoc/WithAuth';
import {GroupSearchOption, GroupsSearch} from "components/Select/GroupsSearch/GroupsSearch";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const onGroupSelected = useCallback((option: GroupSearchOption) => {
        console.log('Selected group: ', option);
        navigate(`/groups/${option.value.groupID}`);
    }, []);

        return <div className={'w-full h-full p-2'}>
        <GroupsSearch onSelect={onGroupSelected}/>
    </div>;
};

Home.displayName = 'HomePage';

export default WithAuth(Home, {
    name: 'HomePage',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
