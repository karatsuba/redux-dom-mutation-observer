import { OBSERVE, DISCONNECT, MUTATION_RECORD } from './types';

export type ObserveAction = {
    type: typeof OBSERVE;
    payload: {
        targetId: string;
    };
};

export const observe = (targetId: string): Action => ({
    type: OBSERVE,
    payload: {
        targetId
    }
});

export type DisconectAction = {
    type: typeof DISCONNECT;
};

export const disconnect = (): Action => ({
    type: DISCONNECT
});

export type MutationRecordAction = {
    type: typeof MUTATION_RECORD;
    payload: {
        mutation: MutationRecord;
    };
};

export const mutationRecord = (mutation: MutationRecord): Action => ({
    type: MUTATION_RECORD,
    payload: {
        mutation
    }
});

export type Action = ObserveAction | DisconectAction | MutationRecordAction;
