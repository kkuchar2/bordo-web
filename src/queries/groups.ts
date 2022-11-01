import {Group} from 'pages/Groups/Groups';

import {queryClient} from '../App';

import {authGet, authPost} from './base';

export const getGroups = () => {
    return authGet<Group[]>(['getGroups'], 'groups/')({
        onSuccess: (data) => {
            data.forEach((group) => {
                queryClient.setQueryData(['group', group.uuid], group);
            });
        },
    });
};

export const getGroup = (uuid: string) => {
    return authGet<Group>(['group', uuid], `groups/${uuid}/`)({
        refetchOnWindowFocus: true
    });
};

export const subscribeToGroup = () => {
    return authPost<any>(['subscribeToGroup'], 'groups/subscribe/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['group']);
        }
    });
}

export const unsubscribeFromGroup = () => {
    return authPost<any>(['unsubscribeFromGroup'], 'groups/unsubscribe/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['group']);
        }
    });
}

export const removeMemberFromGroup = () => {
    return authPost<any>(['removeMemberFromGroup'], 'groups/remove_member/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['group']);
        }
    });
}

export const createGroup = () => {
    return authPost<any>(['createGroup'], 'groups/create_group/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getGroups']);
            queryClient.invalidateQueries(['group']);
        }
    });
};

export const deleteGroup = () => {
    return authPost<any>(['deleteGroup'], 'groups/delete_group/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getGroups']);
            queryClient.invalidateQueries(['group']);
        }
    });
};
