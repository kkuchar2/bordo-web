export type Message = {
    sender: string;
    receiver: string;
    created_at: string;
    content: string;
}

export type ConversationParticipant = {
    username: string;
    profile: {
        avatar: string;
    }
}

export type Conversation = {
    channel_name: string;
    type: string;
    created_at: string;
    updated_at: string;
    participants: ConversationParticipant[];
}
