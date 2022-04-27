import { RequestStatus, ResponseArgs} from "tools/client/client.types";

const isRequestState = (args: ResponseArgs, status: RequestStatus) => args.info.status === status;

export const isWaiting = (args: ResponseArgs) => isRequestState(args, RequestStatus.Waiting);
export const isSuccess = (args: ResponseArgs) => isRequestState(args, RequestStatus.Success);
export const isFailure = (args: ResponseArgs) => isRequestState(args, RequestStatus.Failure);
