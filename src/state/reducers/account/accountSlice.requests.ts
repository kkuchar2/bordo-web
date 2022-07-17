import {ResponseArgs} from "tools/client/client.types";

import {User} from "./accountSlice.types";

export interface AccountSliceState {
    requests: {
        [name: string]: ResponseArgs;
    }
    user: User,
    databaseInfo: any,
}