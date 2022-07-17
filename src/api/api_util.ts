import {useMemo} from "react";

import {RequestStatus, ResponseArgs} from "tools/client/client.types";

const isRequestState = (args: ResponseArgs, status: RequestStatus) => args.info.status === status;

const isState = (status: RequestStatus) => (args: ResponseArgs) => isRequestState(args, status);

export const isUnknown = isState(RequestStatus.Unknown);
export const isWaiting = isState(RequestStatus.Waiting);
export const isSuccess = isState(RequestStatus.Success);
export const isFailure = isState(RequestStatus.Failure);

export const useRequestState = (state: any, s: RequestStatus) => useMemo(() => isState(s)(state), [state]);