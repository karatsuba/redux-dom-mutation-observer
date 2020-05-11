import createMiddleware from './middleware/createMiddleware';
import { observe, disconnect } from './actions/actions';

export * from './actions/types';
export type { Action as ReduxDOMMutationObserverActions } from './actions/actions';

export { observe, disconnect, createMiddleware as default };
