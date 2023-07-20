import { afterLoginMiddleware } from './afterLogin';
import { loggerMiddleware } from './logger';
import { serverErrorMiddleware } from './serverError';

export const middlewares = [
    afterLoginMiddleware,
    loggerMiddleware,
    serverErrorMiddleware,
] as const;