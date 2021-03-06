import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import ReduxMutationObserver from '../ReduxMutationObserver';
import { OBSERVE, DISCONNECT } from '../actions/types';
import { Action, ObserveAction } from '../actions/actions';

export default (): Middleware => {
    const reduxMutationObserver = new ReduxMutationObserver();

    return (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
        if (action.type === OBSERVE) {
            reduxMutationObserver.observe(store, action as ObserveAction);
        }

        if (action.type === DISCONNECT) {
            reduxMutationObserver.disconnect();
        }

        return next(action);
    };
};
