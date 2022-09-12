import {ResponseArgs} from 'tools/client/client.types';

import {Conversation} from './conversationsSlice.types';

export interface ConversationsSliceState {
    requests: {
        [name: string]: ResponseArgs;
    },
    conversations: Conversation[];
}