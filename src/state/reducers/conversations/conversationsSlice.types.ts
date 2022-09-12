export type Message = {
    sender: string;
    created_at: string;
    content: string;
}

export type ConversationParticipant = {
    username: string;
    profile: {
        avatar: string;
        use_animated_avatar: boolean;
        animated_avatar: string;
    }
}

export type Conversation = {
    channel_name: string;
    type: string;
    created_at: string;
    updated_at: string;
    participants: ConversationParticipant[];
}