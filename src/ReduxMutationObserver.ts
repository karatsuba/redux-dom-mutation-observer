import { MiddlewareAPI } from 'redux';
import { ObserveAction } from './actions/actions';
import { mutationRecord } from './actions/actions';

export default class ReduxMutationObserver {
    private options: MutationObserverInit;
    private observer: MutationObserver | null = null;

    constructor(options: MutationObserverInit) {
        this.options = options;
    }

    private getTargetById = (targetId: string): HTMLElement | null => {
        return document.getElementById(targetId);
    };

    observe = ({ dispatch }: MiddlewareAPI, { payload }: ObserveAction): void => {
        if (!this.observer) {
            this.observer = new MutationObserver((mutations: MutationRecord[]) => {
                mutations.forEach(mutation => dispatch(mutationRecord(mutation)));
            });
        }

        const target = this.getTargetById(payload.targetId);
        if (target) {
            this.observer.observe(target, this.options);
        }
    };

    disconnect = (): void => {
        if (this.observer) {
            this.observer.disconnect();
        }
    };
}
