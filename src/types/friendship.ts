export interface FriendshipRequest {
    id: number;
    from_user: string;
    to_user: string;
    created: string;
    message: string;
    rejected: boolean;
    viewed: boolean;
}