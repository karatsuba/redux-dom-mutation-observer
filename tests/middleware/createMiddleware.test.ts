import middleware from '../../src/middleware/createMiddleware';
import ReduxMutationObserver from '../../src/ReduxMutationObserver';
import { observe, disconnect } from '../../src/actions/actions';

jest.mock('../../src/ReduxMutationObserver');

const ReduxMutationObserverMock = ReduxMutationObserver as jest.Mock<ReduxMutationObserver>;

const observeMock = jest.fn();
const disconnectMock = jest.fn();

ReduxMutationObserverMock.mockImplementation((options) => {
    class ReduxMutationObserverMockClass {
        private options = options;
        observe = observeMock;
        disconnect = disconnectMock;
        getTargetById = jest.fn();
    }

    return (new ReduxMutationObserverMockClass() as unknown) as ReduxMutationObserver;
});

const mockStore = () => {
    const store = { getState: jest.fn(), dispatch: jest.fn() };
    const wrapper = middleware()(store);
    const dispatch = wrapper((i) => i);

    return { store, wrapper, dispatch };
};

describe('Middleware', () => {
    beforeEach(() => {
        observeMock.mockClear();
        disconnectMock.mockClear();
        ReduxMutationObserverMock.mockClear();
    });

    it('should create ReduxMutationObserver with options', () => {
        middleware();

        expect(ReduxMutationObserverMock).toHaveBeenCalledTimes(1);
    });

    it('should handle observe action', () => {
        const { store, dispatch } = mockStore();
        const dispatchedAction = {
            type: 'REDUX_DOM_MUTATION_OBSERVER:OBSERVE',
            payload: {
                targetId: 'targetId',
                options: {
                    subtree: true,
                    childList: true
                }
            }
        };

        const action = dispatch(
            observe('targetId', {
                subtree: true,
                childList: true
            })
        );

        expect(action).toEqual(dispatchedAction);
        expect(observeMock).toHaveBeenCalledWith(store, dispatchedAction);
        expect(observeMock).toHaveBeenCalledTimes(1);
    });

    it('should handle disconnect action', () => {
        const { dispatch } = mockStore();
        const dispatchedAction = {
            type: 'REDUX_DOM_MUTATION_OBSERVER:DISCONNECT'
        };

        const action = dispatch(disconnect());

        expect(action).toEqual(dispatchedAction);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
