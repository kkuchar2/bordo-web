import { afterLoginMiddleware } from './afterLogin';
import { channelMiddleware } from './channels';
import { chatMiddleware } from './chat';
import { loggerMiddleware } from './logger';
import { serverErrorMiddleware } from './serverError';

export const middlewares = [
    afterLoginMiddleware,
    loggerMiddleware,
    channelMiddleware,
    serverErrorMiddleware,
    chatMiddleware
] as const;