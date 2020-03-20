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

export const MUTATION_RECORD = `${PREFIX}:MUTATION_RECORD`;

export type MutationRecordAction = {
    type: typeof MUTATION_RECORD;
    payload: {
        mutation: MutationRecord;
    };
};

export type Actions = ObserveAction | DisconectAction | MutationRecordAction;
