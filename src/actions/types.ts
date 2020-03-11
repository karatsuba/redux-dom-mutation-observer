const PREFIX = 'REDUX_DOM_MUTATION_OBSERVER';

export const OBSERVE = `${PREFIX}:OBSERVE`;

export type ObserveAction = {
    type: typeof OBSERVE;
    payload: {
        targetId: string;
    };
};

export const DISCONNECT = `${PREFIX}:DISCONNECT`;

export type DisconectAction = {
    type: typeof DISCONNECT;
};

export type Actions = ObserveAction | DisconectAction;
