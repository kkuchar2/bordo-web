import {UserProfile} from 'state/reducers/account/accountSlice.types';

import {queryClient} from '../App';
import {FriendshipRequest} from '../types/friendship';

import {authGet, authPost} from './base';

interface FriendRequestIdRequestData {
    id: number;
}

export const getProfile = (username: string) => {
    return authGet<UserProfile>(['getProfile'], `people/profile/${username}`);
};

export const searchPeople = () => {
    return authPost<any>(['searchPeople'], 'people/search');
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