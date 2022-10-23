import { Group } from 'pages/Groups/Groups';

import {queryClient} from '../App';

import {authGet, authPost} from './base';

export const getGroups = () => {
    return authGet<Group[]>(['groups'], 'groups/')({});
};

export const getGroup = (uuid: string) => {
    return authGet<Group>(['group', uuid], `groups/${uuid}/`)();
};

export const createGroup = () => {
    return authPost<any>(['createGroup'], 'groups/create_group/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getGroups']);
        }
    });
};

export const deleteGroup = () => {
    return authPost<any>(['deleteGroup'], 'groups/delete_group/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getGroups']);
        }
    });
};