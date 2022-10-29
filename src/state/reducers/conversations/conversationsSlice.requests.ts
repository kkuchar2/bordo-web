import {ResponseArgs} from 'tools/client/client.types';

import {Conversation, Message} from './conversationsSlice.types';

export interface ConversationsSliceState {
    requests: {
        [name: string]: ResponseArgs;
    },
    conversations: Conversation[];
    messages: {
        [receiver: string]: Message[];
    }
}
