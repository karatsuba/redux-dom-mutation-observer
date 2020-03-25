import { JSDOM } from 'jsdom';
import ReduxMutationObserver from '../src/ReduxMutationObserver';
import { ObserveAction, observe, mutationRecord } from '../src/actions/actions';

declare global {
    namespace NodeJS {
        interface Global {
            MutationObserver: any;
            document: Document;
        }
    }
}

describe('ReduxMutationObserver', () => {
    global.document = new JSDOM().window.document;

    const store = { dispatch: jest.fn(i => i), getState: jest.fn() };
    const options: MutationObserverInit = {
        subtree: true,
        childList: true
    };

    let reduxMutationObserver: ReduxMutationObserver;
    let mutationCallback: (mutations: MutationRecord[]) => void;

    const observeMock = jest.fn();
    const disconnectMock = jest.fn();

    beforeEach(() => {
        reduxMutationObserver = new ReduxMutationObserver(options);

        store.dispatch.mockClear();
        observeMock.mockClear();
        disconnectMock.mockClear();

        global.MutationObserver = jest.fn(callback => {
            mutationCallback = callback;
            return {
                observe: observeMock,
                disconnect: disconnectMock,
                takeRecords: jest.fn()
            };
        });
    });

    describe('observe', () => {
        const getElementByIdSpy = jest.spyOn(global.document, 'getElementById');
        const action = observe('targetId');

        beforeEach(() => {
            getElementByIdSpy.mockClear();
        });

        it('should create a new MutationObserver instance', () => {
            reduxMutationObserver.observe(store, action as ObserveAction);

            expect(global.MutationObserver).toHaveBeenCalledTimes(1);
        });

        it('should use already crealted MutationObserver instance', () => {
            reduxMutationObserver.observe(store, action as ObserveAction);
            reduxMutationObserver.observe(store, action as ObserveAction);
            reduxMutationObserver.observe(store, action as ObserveAction);

            expect(global.MutationObserver).toHaveBeenCalledTimes(1);
        });

        it('should do not start observe when there is no target node found', () => {
            getElementByIdSpy.mockReturnValue(null);

            reduxMutationObserver.observe(store, action as ObserveAction);

            expect(global.document.getElementById).toHaveBeenCalledWith('targetId');
            expect(observeMock).not.toHaveBeenCalled();
        });

        it('should get a target node and start observe', () => {
            const target = global.document.createElement('div');
            getElementByIdSpy.mockReturnValue(target);

            reduxMutationObserver.observe(store, action as ObserveAction);

            expect(global.document.getElementById).toHaveBeenCalledWith('targetId');
            expect(observeMock).toHaveBeenCalledWith(target, options);
        });

        it('should dispatch mutation records', () => {
            const div = global.document.createElement('div');
            const mutation: MutationRecord = {
                type: 'childList',
                target: div,
                addedNodes: div.childNodes,
                removedNodes: div.childNodes,
                attributeName: null,
                attributeNamespace: null,
                nextSibling: null,
                previousSibling: null,
                oldValue: null
            };

            mutationCallback([mutation]);

            expect(store.dispatch).toHaveBeenCalledWith(mutationRecord(mutation));
        });
    });

    describe('disconnect', () => {
        it('should stop observing', () => {
            // init observe action and create observer
            const action = observe('targetId');
            reduxMutationObserver.observe(store, action as ObserveAction);

            // disconnect
            reduxMutationObserver.disconnect();

            expect(disconnectMock).toHaveBeenCalledTimes(1);
        });

        it('should do nothing if observer instance is missing', () => {
            // disconnect
            reduxMutationObserver.disconnect();

            expect(disconnectMock).toHaveBeenCalledTimes(0);
        });
    });
});
