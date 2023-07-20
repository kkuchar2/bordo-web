import { Conversation, Message } from './conversationsSlice.types';

import { ResponseArgs } from '@/tools/client/client.types';

export interface ConversationsSliceState {
    requests: {
        [name: string]: ResponseArgs;
    },
    conversations: Conversation[];
    messages: {
        [receiver: string]: Message[];
    }
}
