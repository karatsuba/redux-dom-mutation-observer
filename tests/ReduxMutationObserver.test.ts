import { JSDOM } from 'jsdom';
import ReduxMutationObserver from '../src/ReduxMutationObserver';
import { ObserveAction, observe } from '../src/actions/actions';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            MutationObserver: any;
            document: any;
        }
    }
}

global.document = new JSDOM().window.document;

describe('ReduxMutationObserver', () => {
    const store = { dispatch: jest.fn(i => i), getState: jest.fn() };
    const options: MutationObserverInit = {
        subtree: true,
        childList: true
    };

    let reduxMutationObserver: ReduxMutationObserver;

    const observeMock = jest.fn();
    const disconnectMock = jest.fn();

    beforeEach(() => {
        reduxMutationObserver = new ReduxMutationObserver(options);

        store.dispatch.mockClear();
        observeMock.mockClear();
        disconnectMock.mockClear();

        global.MutationObserver = jest.fn(() => ({
            observe: observeMock,
            disconnect: disconnectMock,
            takeRecords: jest.fn()
        }));
    });

    describe('observe', () => {
        const action = observe('targetId');
        const getElementByIdSpy = jest.spyOn(global.document, 'getElementById');

        beforeEach(() => {
            getElementByIdSpy.mockClear();
        });

        it('should create a new MutationObserver instance', () => {
            reduxMutationObserver.observe(store, action as ObserveAction);

            expect(global.MutationObserver).toHaveBeenCalledTimes(1);
        });

        it('should not get a target node and do not start observe', () => {
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
    });
});
