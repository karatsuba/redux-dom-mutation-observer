import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import ReduxMutationObserver from '../ReduxMutationObserver';
import { OBSERVE, DISCONNECT, Actions, ObserveAction } from '../actions/types';

export default (options: any): Middleware => {
    const reduxMutationObserver = new ReduxMutationObserver(options);

    return (store: MiddlewareAPI) => (next: Dispatch<Actions>) => (action: Actions) => {
        if (action.type === OBSERVE) {
            // todo: check weird bug with ts compiler
            // action type should be resolved by compiler here as ObserveAction
            reduxMutationObserver.observe(store, action as ObserveAction);
        }

        if (action.type === DISCONNECT) {
            reduxMutationObserver.disconnect();
        }

        return next(action);
    };
};
