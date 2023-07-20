import { UserProfile } from './account/types';
import { authGet, authPost } from './base';

import { queryClient } from '@/config';
import { FriendshipRequest } from '@/types/friendship';

interface FriendRequestIdRequestData {
    id: number;
}

export const getProfile = (username: string) => {
    return authGet<UserProfile>(['profile', username], `people/profile/${username}`);
};

export const searchPeople = () => {
    return authPost<any>(['searchPeople'], 'people/search');
};

export const searchGroup = () => {
    return authPost<any>(['searchGroup'], 'groups/search');
};

export const getFriends = () => {
    return authGet<any>(['getFriends'], 'people/connections/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getSentFriendRequests']);
            queryClient.invalidateQueries(['getFriendRequests']);
        }
    });
};

export const getReceivedFriendRequests = () => {
    return authGet<FriendshipRequest[]>(['getFriendRequests'], 'people/connections/requests/')({});
};

export const getSentFriendRequests = () => {
    return authGet<FriendshipRequest[]>(['getSentFriendRequests'], 'people/connections/sent_requests/')({});
};

export const sendFriendRequest = () => {
    return authPost<any>(['sendFriendRequest'], 'people/connections/add_friend/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getSentFriendRequests']);
        }
    });
};

export const unfriend = () => {
    return authPost<any>(['unfriend'], 'people/connections/remove_friend/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getFriends']);
        }
    });
};

export const acceptFriendRequest = () => {
    return authPost<any, FriendRequestIdRequestData>(['acceptFriendRequest'], 'people/connections/accept_request/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getFriendRequests']);
            queryClient.invalidateQueries(['getFriends']);
        }
    });
};

export const rejectFriendRequest = () => {
    return authPost<any, FriendRequestIdRequestData>(['rejectFriendRequest'], 'people/connections/reject_request/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getFriendRequests']);
        }
    });
};

export const cancelFriendRequest = () => {
    return authPost<any, FriendRequestIdRequestData>(['removeFriendRequest'], 'people/connections/cancel_request/')({
        onSuccess: () => {
            queryClient.invalidateQueries(['getSentFriendRequests']);
        },
    });
};
