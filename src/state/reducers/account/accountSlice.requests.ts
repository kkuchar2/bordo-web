import {ResponseArgs} from 'tools/client/client.types';

export interface AccountSliceState {
    requests: {
        [name: string]: ResponseArgs;
    }
}