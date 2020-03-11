import { Middleware, MiddlewareAPI, Action } from 'redux';
import ReduxMutationObserver from '../ReduxMutationObserver';
import { OBSERVE, DISCONNECT } from '../actions/types';

export default (options: any): Middleware => {
    const reduxMutationObserver = new ReduxMutationObserver();

    return (store: MiddlewareAPI) => next => (action: Action) => {
        if (action.type === OBSERVE) {
            reduxMutationObserver.observe(store, action);
        }

        if (action.type === DISCONNECT) {
            reduxMutationObserver.disconnect();
        }

        return next(action);
    };
};
