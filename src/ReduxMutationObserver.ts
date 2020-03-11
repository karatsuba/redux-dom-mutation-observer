import { MiddlewareAPI } from 'redux';
import { ObserveAction } from './actions/types';

export default class ReduxMutationObserver {
    private options: any;
    private observer: MutationObserver | null = null;

    constructor(options: any) {
        this.options = options;
    }

    private getTargetById = (targetId: string): HTMLElement | null => {
        return document.getElementById(targetId);
    };

    observe = ({ dispatch }: MiddlewareAPI, { payload }: ObserveAction): void => {
        if (!this.observer) {
            this.observer = new MutationObserver((mutations: MutationRecord[]) => {
                mutations.forEach(mutation => {
                    console.log('HANDLE MUTATION HERE', mutation);
                    // handler.handle(mutation)
                });
            });
        }

        const target = this.getTargetById(payload.targetId);
        if (target) {
            this.observer.observe(target, this.options);
        }
    };

    disconnect = ({ dispatch }: MiddlewareAPI): void => {
        console.log('DISCONECT HERE');
    };
}
